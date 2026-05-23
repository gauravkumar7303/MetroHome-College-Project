// import { NextResponse } from 'next/server';
// import connectDB from '@/src/lib/db';
// import Inquiry from '@/src/models/Inquiry';
// import Deal from '@/src/models/Deal';
// import Property from '@/src/models/Property';
// import { sendInquiryToDealEmail } from '@/src/lib/email';
// import { getUserFromRequest } from '@/src/lib/auth';

// export async function POST(request, { params }) {
//   try {
//     const user = await getUserFromRequest(request);
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     const { id } = params;
//     const { agreedPrice, securityDeposit, startDate, duration } = await request.json();
    
//     const inquiry = await Inquiry.findById(id).populate('propertyId');
    
//     if (!inquiry) {
//       return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
//     }
    
//     // Create deal
//     const deal = await Deal.create({
//       propertyId: inquiry.propertyId._id,
//       ownerId: inquiry.propertyId.listerId,
//       tenantId: inquiry.userId,
//       inquiryId: inquiry._id,
//       dealType: inquiry.propertyId.category,
//       agreedPrice,
//       securityDeposit: securityDeposit || inquiry.propertyId.securityDeposit,
//       startDate: new Date(startDate),
//       duration,
//       status: 'negotiation'
//     });
    
//     // Update inquiry
//     inquiry.status = 'converted';
//     inquiry.dealId = deal._id;
//     inquiry.convertedAt = new Date();
//     await inquiry.save();
    
//     // Send email notification
//     await sendInquiryToDealEmail({
//       to: user.email,
//       userName: user.name,
//       propertyTitle: inquiry.propertyId.title,
//       dealId: deal._id
//     });
    
//     return NextResponse.json({
//       success: true,
//       deal,
//       message: 'Inquiry converted to deal successfully!'
//     });
    
//   } catch (error) {
//     console.error('Conversion error:', error);
//     return NextResponse.json({ error: 'Failed to convert inquiry' }, { status: 500 });
//   }
// }


//api/inquiries/[id]/convert-to-deal/route.js - Convert an inquiry into a deal, generate documents, and send email notifications
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/src/lib/db';
// import Inquiry from '@/src/models/Inquiry';
// import Deal from '@/src/models/Deal';
// import Property from '@/src/models/Property';
// import User from '@/src/models/User';
// import { getUserFromRequest } from '@/src/lib/auth';
// import { sendDealDocumentsEmail } from '@/src/lib/email';
// import { generateDocuments } from '@/src/lib/documentGenerator';

// export async function POST(request, { params }) {
//   try {
//     const userData = await getUserFromRequest(request);
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     const { id } = await params;
//     const { agreedPrice, securityDeposit, startDate, duration } = await request.json();
    
//     const inquiry = await Inquiry.findById(id).populate('propertyId');
//     if (!inquiry) {
//       return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
//     }
    
//     const property = inquiry.propertyId;
//     const owner = await User.findById(property.listerId);
//     const tenant = await User.findById(inquiry.userId);
    
//     if (!owner || !tenant) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
    
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + duration);
    
//     // Generate documents based on property type
//     const documents = generateDocuments({
//       property,
//       owner,
//       tenant,
//       agreedPrice,
//       securityDeposit,
//       startDate,
//       endDate,
//       duration,
//       propertyType: property.type,
//       category: property.category
//     });
    
//     const deal = await Deal.create({
//       propertyId: property._id,
//       ownerId: owner._id,
//       tenantId: tenant._id,
//       inquiryId: inquiry._id,
//       dealType: property.category,
//       propertyType: property.type,
//       agreedPrice,
//       securityDeposit: securityDeposit || agreedPrice * 2,
//       startDate: new Date(startDate),
//       endDate,
//       duration,
//       documents,
//       status: 'agreement_draft'
//     });
    
//     inquiry.status = 'converted';
//     inquiry.dealId = deal._id;
//     inquiry.convertedAt = new Date();
//     await inquiry.save();
    
//     // Send email with documents
//     await sendDealDocumentsEmail({
//       to: tenant.email,
//       cc: owner.email,
//       tenantName: tenant.name,
//       ownerName: owner.name,
//       propertyTitle: property.title,
//       dealId: deal._id,
//       documents,
//       dealType: property.category,
//       propertyType: property.type
//     });
    
//     return NextResponse.json({
//       success: true,
//       deal,
//       documents,
//       message: 'Deal created successfully! Documents sent to email.'
//     });
    
//   } catch (error) {
//     console.error('Conversion error:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import { connectDB } from '@/src/lib/db';
// import Inquiry from '@/src/models/Inquiry';
// import Deal from '@/src/models/Deal';
// import Property from '@/src/models/Property';
// import User from '@/src/models/User';
// import { getUserFromRequest } from '@/src/lib/auth';
// import { sendDealDocumentsEmail } from '@/src/lib/email';
// import { generateDocuments } from '@/src/lib/documentGenerator';

// export async function POST(request, { params }) {
//   try {
//     console.log('🚀 POST /api/inquiries/[id]/convert-to-deal called');
    
//     const userData = await getUserFromRequest(request);
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     // ✅ Await params properly
//     const { id } = await params;
//     console.log('🔍 Converting inquiry ID:', id);
    
//     const { agreedPrice, securityDeposit, startDate, duration } = await request.json();
//     console.log('📦 Deal data:', { agreedPrice, securityDeposit, startDate, duration });
    
//     // Find inquiry
//     const inquiry = await Inquiry.findById(id).populate('propertyId');
//     if (!inquiry) {
//       console.log('❌ Inquiry not found:', id);
//       return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
//     }
    
//     console.log('✅ Inquiry found:', inquiry._id);
    
//     const property = inquiry.propertyId;
//     if (!property) {
//       return NextResponse.json({ error: 'Property not found' }, { status: 404 });
//     }
    
//     console.log('✅ Property found:', property.title);
    
//     // Find owner and tenant
//     const owner = await User.findById(property.listerId);
//     const tenant = await User.findById(inquiry.userId);
    
//     if (!owner || !tenant) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
    
//     console.log('✅ Owner:', owner.name, '| Tenant:', tenant.name);
    
//     const endDate = new Date(startDate);
//     endDate.setMonth(endDate.getMonth() + duration);
    
//     // Generate documents
//     const documents = generateDocuments({
//       property,
//       owner,
//       tenant,
//       agreedPrice,
//       securityDeposit: securityDeposit || agreedPrice * 2,
//       startDate,
//       endDate,
//       duration,
//       propertyType: property.type,
//       category: property.category
//     });
    
//     console.log('📄 Documents generated:', documents.length);
    
//     // Create deal
//     const deal = await Deal.create({
//       propertyId: property._id,
//       ownerId: owner._id,
//       tenantId: tenant._id,
//       inquiryId: inquiry._id,
//       dealType: property.category,
//       propertyType: property.type,
//       agreedPrice,
//       securityDeposit: securityDeposit || agreedPrice * 2,
//       startDate: new Date(startDate),
//       endDate,
//       duration,
//       documents,
//       status: 'agreement_draft'
//     });
    
//     console.log('✅ Deal created:', deal._id);
    
//     // Update inquiry
//     inquiry.status = 'converted';
//     inquiry.dealId = deal._id;
//     inquiry.convertedAt = new Date();
//     await inquiry.save();
    
//     // Send email
//     try {
//       await sendDealDocumentsEmail({
//         to: tenant.email,
//         cc: owner.email,
//         tenantName: tenant.name,
//         ownerName: owner.name,
//         propertyTitle: property.title,
//         dealId: deal._id,
//         documents,
//         dealType: property.category,
//         propertyType: property.type
//       });
//       console.log('📧 Email sent to:', tenant.email);
//     } catch (emailError) {
//       console.error('Email error (non-blocking):', emailError.message);
//     }
    
//     return NextResponse.json({
//       success: true,
//       deal,
//       documents,
//       message: 'Deal created successfully! Documents sent to email.'
//     });
    
//   } catch (error) {
//     console.error('❌ Conversion error:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Inquiry from '@/src/models/Inquiry';
import Deal from '@/src/models/Deal';
import Property from '@/src/models/Property';
import User from '@/src/models/User';
import { getUserFromRequest } from '@/src/lib/auth';
import { sendDealDocumentsEmail } from '@/src/lib/email';
import { generateDocuments } from '@/src/lib/documentGenerator';

export async function POST(request) {
  try {
    console.log('🚀 POST /api/inquiries/convert-to-deal');
    
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    // ✅ Get inquiryId from request body (NOT from params)
    const { inquiryId, agreedPrice, securityDeposit, startDate, duration } = await request.json();
    
    if (!inquiryId) {
      return NextResponse.json({ error: 'Inquiry ID required' }, { status: 400 });
    }
    
    console.log('🔍 Inquiry ID:', inquiryId);
    console.log('📦 Deal data:', { agreedPrice, securityDeposit, startDate, duration });
    
    const inquiry = await Inquiry.findById(inquiryId).populate('propertyId');
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    
    console.log('✅ Inquiry found:', inquiry._id);
    
    const property = inquiry.propertyId;
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    console.log('✅ Property found:', property.title);
    
    const owner = await User.findById(property.listerId);
    const tenant = await User.findById(inquiry.userId);
    
    if (!owner || !tenant) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('✅ Owner:', owner.name, '| Tenant:', tenant.name);
    
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);
    
    const documents = generateDocuments({
      property,
      owner,
      tenant,
      agreedPrice,
      securityDeposit: securityDeposit || agreedPrice * 2,
      startDate,
      endDate,
      duration,
      propertyType: property.type,
      category: property.category
    });
    
    console.log('📄 Documents generated:', documents.length);
    
    const deal = await Deal.create({
      propertyId: property._id,
      ownerId: owner._id,
      tenantId: tenant._id,
      inquiryId: inquiry._id,
      dealType: property.category,
      propertyType: property.type,
      agreedPrice,
      securityDeposit: securityDeposit || agreedPrice * 2,
      startDate: new Date(startDate),
      endDate,
      duration,
      documents,
      status: 'agreement_draft'
    });
    
    console.log('✅ Deal created:', deal._id);
    
    inquiry.status = 'converted';
    inquiry.dealId = deal._id;
    inquiry.convertedAt = new Date();
    await inquiry.save();
    
    try {
      await sendDealDocumentsEmail({
        to: tenant.email,
        cc: owner.email,
        tenantName: tenant.name,
        ownerName: owner.name,
        propertyTitle: property.title,
        dealId: deal._id,
        documents,
        dealType: property.category,
        propertyType: property.type
      });
      console.log('📧 Email sent to:', tenant.email);
    } catch (emailError) {
      console.error('Email error (non-blocking):', emailError.message);
    }
    
    return NextResponse.json({
      success: true,
      deal,
      documents,
      message: 'Deal created successfully! Documents sent to email.'
    });
    
  } catch (error) {
    console.error('❌ Conversion error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}