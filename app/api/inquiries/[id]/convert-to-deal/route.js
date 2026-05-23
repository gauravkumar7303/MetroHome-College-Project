import { NextResponse } from 'next/server';
import connectDB from '@/src/lib/db';
import Inquiry from '@/src/models/Inquiry';
import Deal from '@/src/models/Deal';
import Property from '@/src/models/Property';
import { sendInquiryToDealEmail } from '@/src/lib/email';
import { getUserFromRequest } from '@/src/lib/auth';

export async function POST(request, { params }) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const { id } = params;
    const { agreedPrice, securityDeposit, startDate, duration } = await request.json();
    
    const inquiry = await Inquiry.findById(id).populate('propertyId');
    
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    
    // Create deal
    const deal = await Deal.create({
      propertyId: inquiry.propertyId._id,
      ownerId: inquiry.propertyId.listerId,
      tenantId: inquiry.userId,
      inquiryId: inquiry._id,
      dealType: inquiry.propertyId.category,
      agreedPrice,
      securityDeposit: securityDeposit || inquiry.propertyId.securityDeposit,
      startDate: new Date(startDate),
      duration,
      status: 'negotiation'
    });
    
    // Update inquiry
    inquiry.status = 'converted';
    inquiry.dealId = deal._id;
    inquiry.convertedAt = new Date();
    await inquiry.save();
    
    // Send email notification
    await sendInquiryToDealEmail({
      to: user.email,
      userName: user.name,
      propertyTitle: inquiry.propertyId.title,
      dealId: deal._id
    });
    
    return NextResponse.json({
      success: true,
      deal,
      message: 'Inquiry converted to deal successfully!'
    });
    
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json({ error: 'Failed to convert inquiry' }, { status: 500 });
  }
}