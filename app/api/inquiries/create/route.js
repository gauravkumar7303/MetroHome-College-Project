// // Path: app/api/inquiries/create/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/src/lib/db';
// import { getUserFromRequest } from '@/src/lib/auth';
// import mongoose from 'mongoose';
// import Inquiry from '@/src/models/Inquiry';
// import Visit from '@/src/models/Visit';

// export async function POST(request) {
//   try {
//     const userData = await getUserFromRequest(request);
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await connectDB();

//     const { visitId, propertyId, propertyTitle, propertyLocation, propertyImage, message } = await request.json();

//     if (!propertyId || !propertyTitle || !message) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     const userId = userData.id || userData.userId;

//     // Check if inquiry already exists for this visit
//     if (visitId) {
//       const existing = await Inquiry.findOne({
//         userId: new mongoose.Types.ObjectId(userId),
//         propertyId: new mongoose.Types.ObjectId(propertyId),
//       });
//       if (existing) {
//         return NextResponse.json({ error: 'Inquiry already exists for this property' }, { status: 409 });
//       }
//     }

//     // Get property price from DB
//     const property = await mongoose.connection.db.collection('properties').findOne({
//       _id: new mongoose.Types.ObjectId(propertyId)
//     });

//     // Create inquiry
//     const inquiry = await Inquiry.create({
//       propertyId: new mongoose.Types.ObjectId(propertyId),
//       userId: new mongoose.Types.ObjectId(userId),
//       propertyTitle,
//       propertyLocation,
//       propertyImage: propertyImage || '',
//       propertyPrice: property?.price || '',
//       message,
//       status: 'new',
//     });

//     console.log('✅ Inquiry created:', inquiry._id);

//     // Update visit status to 'converted' if visitId provided
//     if (visitId) {
//       await Visit.findByIdAndUpdate(visitId, { status: 'converted' });
//       console.log('✅ Visit marked as converted:', visitId);
//     }

//     return NextResponse.json({ success: true, inquiry: { id: inquiry._id } }, { status: 201 });

//   } catch (error) {
//     console.error('❌ Create inquiry error:', error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// Path: app/api/inquiries/create/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { getUserFromRequest } from '@/src/lib/auth';
import mongoose from 'mongoose';
import Inquiry from '@/src/models/Inquiry';
import Visit from '@/src/models/Visit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const { visitId, propertyId, propertyTitle, propertyLocation, propertyImage, message } = await request.json();

    if (!propertyId || !propertyTitle || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userId = userData.id || userData.userId;

    // Duplicate check
    const existing = await Inquiry.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      propertyId: new mongoose.Types.ObjectId(propertyId),
    });
    if (existing) {
      return NextResponse.json({ error: 'Inquiry already exists for this property' }, { status: 409 });
    }

    // Get property details
    const property = await mongoose.connection.db.collection('properties').findOne({
      _id: new mongoose.Types.ObjectId(propertyId)
    });

    // Get tenant (logged in user) details
    const tenant = await mongoose.connection.db.collection('users').findOne({
      _id: new mongoose.Types.ObjectId(userId)
    });

    // Create inquiry
    const inquiry = await Inquiry.create({
      propertyId: new mongoose.Types.ObjectId(propertyId),
      userId: new mongoose.Types.ObjectId(userId),
      propertyTitle,
      propertyLocation,
      propertyImage: propertyImage || '',
      propertyPrice: property?.price || '',
      propertyType: property?.type || '',
      propertyCategory: property?.category || '',
      message,
      status: 'new',
    });

    console.log('✅ Inquiry created:', inquiry._id);

    // Mark visit as converted
    if (visitId) {
      await Visit.findByIdAndUpdate(visitId, { status: 'converted' });
      console.log('✅ Visit marked converted:', visitId);
    }

    // ✅ Send email to TENANT only
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [tenant.email],
        subject: `✅ Inquiry Created — ${propertyTitle} | MetroHome`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 28px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px;">🏠 MetroHome Finder</h1>
              <p style="color: #dcfce7; margin: 6px 0 0 0; font-size: 13px;">Inquiry Submitted Successfully!</p>
            </div>
            <div style="background: white; padding: 28px; border-radius: 0 0 12px 12px;">
              <h2 style="color: #111827; font-size: 18px;">Hello ${tenant.name}!</h2>
              <p style="color: #374151;">Your inquiry has been successfully created. Our team will connect you with the property owner soon.</p>

              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px; margin: 16px 0;">
                <h3 style="color: #166534; margin: 0 0 10px 0; font-size: 15px;">🏡 Property Details</h3>
                <p style="margin: 4px 0; color: #374151;"><strong>Property:</strong> ${propertyTitle}</p>
                <p style="margin: 4px 0; color: #374151;"><strong>Location:</strong> ${propertyLocation}</p>
                ${property?.price ? `<p style="margin: 4px 0; color: #16a34a; font-weight: bold;">${property.price}</p>` : ''}
              </div>

              <div style="background: #f3f4f6; border-radius: 8px; padding: 14px; margin: 16px 0;">
                <p style="color: #374151; margin: 0 0 6px 0; font-weight: bold;">💬 Your Message:</p>
                <p style="color: #374151; margin: 0; font-style: italic;">"${message}"</p>
              </div>

              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; margin: 16px 0;">
                <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 14px;">📋 Next Steps</h4>
                <ol style="color: #1e40af; margin: 0; padding-left: 20px; line-height: 2; font-size: 13px;">
                  <li>Our MetroHome agent will review your inquiry</li>
                  <li>You'll be connected with the property owner</li>
                  <li>Negotiate and finalize the deal</li>
                  <li>Convert to deal to get your documents</li>
                </ol>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/profile/inquiries"
                   style="background: #16a34a; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                  View My Inquiries →
                </a>
              </div>
            </div>
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 12px;">
              © ${new Date().getFullYear()} MetroHome Finder Team
            </p>
          </div>
        `
      });
      console.log('✅ Inquiry confirmation email sent to tenant:', tenant.email);
    } catch (emailErr) {
      console.error('⚠️ Tenant email failed:', emailErr.message);
    }

    return NextResponse.json({ success: true, inquiry: { id: inquiry._id } }, { status: 201 });

  } catch (error) {
    console.error('❌ Create inquiry error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
