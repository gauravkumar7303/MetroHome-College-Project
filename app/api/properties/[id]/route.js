import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Property from '@/src/models/Property';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    // ✅ IMPORTANT: params is a Promise in Next.js 15+
    const { id } = await params;
    
    console.log('🔍 Fetching property with ID:', id);
    
    const property = await Property.findById(id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      property
    });
    
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}