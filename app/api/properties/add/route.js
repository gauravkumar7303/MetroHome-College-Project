// Path: app/api/properties/add/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { getUserFromRequest } from '@/src/lib/auth';
import mongoose from 'mongoose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const body = await request.json();
    const { title, description, type, category, price, priceValue, location, address, city, landmark,
      bedrooms, bathrooms, areaSqft, furnishing, amenities, images } = body;

    if (!title || !location || !price) {
      return NextResponse.json({ error: 'Title, location and price are required' }, { status: 400 });
    }

    // Get user details
    const user = await mongoose.connection.db.collection('users').findOne({
      _id: new mongoose.Types.ObjectId(userData.id || userData.userId)
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Save property to DB
    const property = {
      title,
      description: description || '',
      type: type || 'Flat',
      category: category || 'rent',
      price,
      priceValue: priceValue || 0,
      location,
      address: address || location,
      city: city || 'west_delhi',
      landmark: landmark || '',
      bedrooms: bedrooms || 0,
      bathrooms: bathrooms || 0,
      areaSqft: areaSqft || 0,
      furnishing: furnishing || 'semi',
      amenities: amenities || [],
      images: images?.length ? images : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'],
      isVerified: false,
      rating: 0,
      reviews: 0,
      lister: {
        name: user.name,
        phone: user.phone || 'Not provided',
        email: user.email,
        joined: new Date().getFullYear().toString(),
        properties: 1,
      },
      listerId: user._id,
      createdAt: new Date(),
    };

    const result = await mongoose.connection.db.collection('properties').insertOne(property);
    console.log('✅ Property saved:', result.insertedId);

    // Send confirmation email to lister
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [user.email],
        subject: `✅ Property Listed — ${title} | MetroHome`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
            <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0;">🏠 MetroHome Finder</h1>
              <p style="color: #dcfce7; margin: 8px 0 0 0;">Property Listed Successfully!</p>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
              <h2 style="color: #111827;">Hello ${user.name}!</h2>
              <p style="color: #374151;">Your property has been successfully listed on MetroHome Finder.</p>
              
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #166534; margin-top: 0;">📋 Property Details</h3>
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Type:</strong> ${type} — ${category === 'rent' ? 'For Rent' : category === 'buy' ? 'For Sale' : 'PG'}</p>
              </div>

              <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 10px; padding: 16px; margin: 16px 0;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  ⏳ Your property will be <strong>verified by our team within 24 hours</strong>. 
                  Once verified, it will be visible to all users.
                </p>
              </div>

              <p style="color: #374151; font-size: 14px;">
                You can manage your listings from your profile dashboard.
              </p>
            </div>
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
              © ${new Date().getFullYear()} MetroHome Finder Team
            </p>
          </div>
        `
      });
      console.log('✅ Listing confirmation email sent to:', user.email);
    } catch (emailErr) {
      console.error('⚠️ Email failed:', emailErr.message);
    }

    return NextResponse.json({
      success: true,
      propertyId: result.insertedId,
      message: 'Property listed successfully!'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Add property error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}