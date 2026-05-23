import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Inquiry from '@/src/models/Inquiry';
import { getUserFromRequest } from '@/src/lib/auth';

export async function GET(request, { params }) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await connectDB();
    
    const { id } = await params;
    
    const inquiry = await Inquiry.findById(id);
    
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      inquiry
    });
    
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}