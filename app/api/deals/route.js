// app/api/deals/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Deal from '@/src/models/Deal';
import Property from '@/src/models/Property';
import User from '@/src/models/User'; // ✅ FIX: User import required for populate
import { getUserFromRequest } from '@/src/lib/auth';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const userId = new mongoose.Types.ObjectId(userData.userId);

    const deals = await Deal.find({
      $or: [
        { tenantId: userId },
        { ownerId: userId }
      ]
    })
    .populate('propertyId', 'title location images type category price priceValue')
    .populate('tenantId', 'name email phone')
    .populate('ownerId', 'name email phone')
    .sort({ createdAt: -1 })
    .lean();

    // ownerId in DB is actually property._id for seed data (virtual owner)
    // So populate may return null for ownerId — handle gracefully in frontend
    console.log(`📋 Found ${deals.length} deals for user ${userData.email}`);

    return NextResponse.json({ deals });

  } catch (error) {
    console.error('❌ Deals fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}