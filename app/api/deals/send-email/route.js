// app/api/deals/send-email/route.js - Send deal documents to user email on demand
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Deal from '@/src/models/Deal';
import { getUserFromRequest } from '@/src/lib/auth';
import { sendDealDocumentsEmail } from '@/src/lib/email';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { dealId } = await request.json();
    if (!dealId) {
      return NextResponse.json({ error: 'Deal ID required' }, { status: 400 });
    }

    const deal = await Deal.findById(dealId)
      .populate('propertyId', 'title location type category')
      .populate('tenantId', 'name email')
      .populate('ownerId', 'name email')
      .lean();

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    // Only tenant or owner can request email
    const userId = userData.userId.toString();
    const isOwner = deal.ownerId?._id?.toString() === userId;
    const isTenant = deal.tenantId?._id?.toString() === userId;

    if (!isOwner && !isTenant) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const tenant = deal.tenantId;
    const owner = deal.ownerId;
    const property = deal.propertyId;

    // Send to the requesting user's email (bypass Resend free plan restriction)
    const sendTo = userData.email;

    console.log('📧 Sending deal documents to:', sendTo);

    const result = await sendDealDocumentsEmail({
      to: sendTo,
      tenantName: tenant?.name || 'Tenant',
      ownerName: owner?.name || 'Owner',
      propertyTitle: property?.title || 'Property',
      dealId: deal._id,
      documents: deal.documents || [],
      dealType: deal.dealType,
      propertyType: deal.propertyType
    });

    if (!result.success && !result.mock) {
      return NextResponse.json({ error: 'Failed to send email', details: result.error }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Documents sent to ${sendTo}` 
    });

  } catch (error) {
    console.error('❌ Send email error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}