// import { NextResponse } from 'next/server';
// import { connectDB } from '@/src/lib/db';
// import Inquiry from '@/src/models/Inquiry';
// import Property from '@/src/models/Property';
// import User from '@/src/models/User';
// import { getUserFromRequest } from '@/src/lib/auth';
// import { sendInquiryNotification } from '@/src/lib/email';

// // POST - Create new inquiry
// export async function POST(request) {
//   try {
//     const userData = await getUserFromRequest(request);
    
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     const user = await User.findById(userData.id);
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
    
//     const { propertyId, message, preferredContactMethod } = await request.json();
    
//     if (!propertyId || !message) {
//       return NextResponse.json({ error: 'Property ID and message are required' }, { status: 400 });
//     }
    
//     // Get property details
//     const property = await Property.findById(propertyId).populate('listerId');
//     if (!property) {
//       return NextResponse.json({ error: 'Property not found' }, { status: 404 });
//     }
    
//     // Check if inquiry already exists
//     const existingInquiry = await Inquiry.findOne({
//       propertyId,
//       userId: user._id,
//       status: { $ne: 'lost' }
//     });
    
//     if (existingInquiry) {
//       return NextResponse.json({ 
//         error: 'You already have an active inquiry for this property' 
//       }, { status: 400 });
//     }
    
//     // Get owner details
//     const owner = property.listerId;
    
//     // Create inquiry record
//     const inquiry = await Inquiry.create({
//       propertyId: property._id,
//       userId: user._id,
//       propertyTitle: property.title,
//       propertyLocation: property.location,
//       propertyImage: property.images?.[0] || '',
//       propertyPrice: property.price,
//       message,
//       preferredContactMethod: preferredContactMethod || 'email',
//       ownerId: owner?._id,
//       ownerName: owner?.name,
//       ownerEmail: owner?.email,
//       ownerPhone: owner?.phone,
//       status: 'new'
//     });
    
//     console.log('✅ Inquiry saved to database:', {
//       inquiryId: inquiry._id,
//       property: property.title,
//       user: user.email,
//       owner: owner?.email
//     });
    
//     // Send email notification to property owner
//     let emailSent = false;
//     if (owner && owner.email) {
//       try {
//         const emailResult = await sendInquiryNotification({
//           to: owner.email,
//           ownerName: owner.name,
//           propertyTitle: property.title,
//           inquirerName: user.name,
//           inquirerEmail: user.email,
//           inquirerPhone: user.phone,
//           message: message,
//           inquiryId: inquiry._id.toString()
//         });
        
//         if (emailResult.success) {
//           emailSent = true;
//           inquiry.emailSent = true;
//           await inquiry.save();
//           console.log('📧 Inquiry email sent to owner:', owner.email);
//         }
//       } catch (emailError) {
//         console.error('❌ Email error:', emailError);
//       }
//     }
    
//     return NextResponse.json({
//       success: true,
//       message: 'Inquiry sent successfully! The owner will contact you soon.',
//       inquiryId: inquiry._id,
//       emailSent: emailSent,
//       inquiry: {
//         id: inquiry._id,
//         propertyTitle: property.title,
//         message: message,
//         status: inquiry.status,
//         createdAt: inquiry.createdAt
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Create inquiry error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to send inquiry' },
//       { status: 500 }
//     );
//   }
// }

// // GET - Get user's inquiries
// export async function GET(request) {
//   try {
//     const userData = await getUserFromRequest(request);
    
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get('status');
    
//     let query = { userId: userData.id };
//     if (status && status !== 'all') {
//       query.status = status;
//     }
    
//     const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    
//     return NextResponse.json({
//       success: true,
//       inquiries: inquiries.map(inquiry => ({
//         id: inquiry._id,
//         propertyTitle: inquiry.propertyTitle,
//         propertyLocation: inquiry.propertyLocation,
//         propertyImage: inquiry.propertyImage,
//         propertyPrice: inquiry.propertyPrice,
//         message: inquiry.message,
//         status: inquiry.status,
//         ownerName: inquiry.ownerName,
//         ownerEmail: inquiry.ownerEmail,
//         ownerPhone: inquiry.ownerPhone,
//         createdAt: inquiry.createdAt,
//         convertedAt: inquiry.convertedAt
//       }))
//     });
    
//   } catch (error) {
//     console.error('Error fetching inquiries:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch inquiries' },
//       { status: 500 }
//     );
//   }
// }


// app/api/inquiries/route.js - Handles creating new inquiries and fetching user's inquiries
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Inquiry from '@/src/models/Inquiry';
import Property from '@/src/models/Property';
import User from '@/src/models/User';
import { getUserFromRequest } from '@/src/lib/auth';
import { sendInquiryNotification } from '@/src/lib/email';

// POST - Create new inquiry
export async function POST(request) {
  try {
    const userData = await getUserFromRequest(request);
    
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }
    
    await connectDB();
    
    const user = await User.findById(userData.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const { propertyId, message, preferredContactMethod } = await request.json();
    
    if (!propertyId || !message) {
      return NextResponse.json({ error: 'Property ID and message are required' }, { status: 400 });
    }
    
    const property = await Property.findById(propertyId).populate('listerId');
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    // Check if inquiry already exists
    const existingInquiry = await Inquiry.findOne({
      propertyId,
      userId: user._id,
      status: { $ne: 'lost' }
    });
    
    if (existingInquiry) {
      return NextResponse.json({ 
        error: 'You already have an active inquiry for this property' 
      }, { status: 400 });
    }
    
    const owner = property.listerId;
    
    const inquiry = await Inquiry.create({
      propertyId: property._id,
      userId: user._id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyImage: property.images?.[0] || '',
      propertyPrice: property.price,
      message,
      preferredContactMethod: preferredContactMethod || 'email',
      ownerId: owner?._id,
      ownerName: owner?.name,
      ownerEmail: owner?.email,
      ownerPhone: owner?.phone,
      status: 'new'
    });
    
    console.log('✅ Inquiry saved:', inquiry._id);
    
    // Send email to owner
    if (owner && owner.email) {
      try {
        await sendInquiryNotification({
          to: owner.email,
          ownerName: owner.name,
          propertyTitle: property.title,
          inquirerName: user.name,
          inquirerEmail: user.email,
          inquirerPhone: user.phone,
          message: message,
          inquiryId: inquiry._id.toString()
        });
      } catch (emailError) {
        console.error('Email error:', emailError);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Inquiry sent successfully!',
      inquiryId: inquiry._id,
      inquiry
    });
    
  } catch (error) {
    console.error('Create inquiry error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - Get user's inquiries
export async function GET(request) {
  try {
    const userData = await getUserFromRequest(request);
    
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    // ✅ Find user by email to get correct ID
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('🔍 Fetching inquiries for userId:', user._id);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = { userId: user._id };
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    
    console.log(`📋 Found ${inquiries.length} inquiries for user ${user.email}`);
    
    return NextResponse.json({
      success: true,
      inquiries: inquiries.map(inquiry => ({
        id: inquiry._id,
        propertyId: inquiry.propertyId,
        propertyTitle: inquiry.propertyTitle,
        propertyLocation: inquiry.propertyLocation,
        propertyImage: inquiry.propertyImage,
        propertyPrice: inquiry.propertyPrice,
        message: inquiry.message,
        status: inquiry.status,
        ownerName: inquiry.ownerName,
        ownerEmail: inquiry.ownerEmail,
        ownerPhone: inquiry.ownerPhone,
        createdAt: inquiry.createdAt,
        convertedAt: inquiry.convertedAt,
        dealId: inquiry.dealId
      }))
    });
    
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}