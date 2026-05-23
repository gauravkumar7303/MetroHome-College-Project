// Path: app/api/inquiries/create/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { getUserFromRequest } from '@/src/lib/auth';
import mongoose from 'mongoose';
import Inquiry from '@/src/models/Inquiry';
import Visit from '@/src/models/Visit';

export async function POST(request) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { visitId, propertyId, propertyTitle, propertyLocation, propertyImage, message } = await request.json();

    if (!propertyId || !propertyTitle || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userId = userData.id || userData.userId;

    // Check if inquiry already exists for this visit
    if (visitId) {
      const existing = await Inquiry.findOne({
        userId: new mongoose.Types.ObjectId(userId),
        propertyId: new mongoose.Types.ObjectId(propertyId),
      });
      if (existing) {
        return NextResponse.json({ error: 'Inquiry already exists for this property' }, { status: 409 });
      }
    }

    // Get property price from DB
    const property = await mongoose.connection.db.collection('properties').findOne({
      _id: new mongoose.Types.ObjectId(propertyId)
    });

    // Create inquiry
    const inquiry = await Inquiry.create({
      propertyId: new mongoose.Types.ObjectId(propertyId),
      userId: new mongoose.Types.ObjectId(userId),
      propertyTitle,
      propertyLocation,
      propertyImage: propertyImage || '',
      propertyPrice: property?.price || '',
      message,
      status: 'new',
    });

    console.log('✅ Inquiry created:', inquiry._id);

    // Update visit status to 'converted' if visitId provided
    if (visitId) {
      await Visit.findByIdAndUpdate(visitId, { status: 'converted' });
      console.log('✅ Visit marked as converted:', visitId);
    }

    return NextResponse.json({ success: true, inquiry: { id: inquiry._id } }, { status: 201 });

  } catch (error) {
    console.error('❌ Create inquiry error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}