// // Properties API route
// import { NextResponse } from 'next/server'

// // Mock data for testing
// const mockProperties = [
//   {
//     id: '1',
//     title: '2 BHK Fully Furnished Flat in Rajouri Garden',
//     description: 'Beautiful flat with modern amenities',
//     type: 'flat',
//     category: 'rent',
//     price: 25000,
//     location: 'Rajouri Garden',
//     city: 'west_delhi',
//     bedrooms: 2,
//     bathrooms: 2,
//     areaSqft: 1200,
//     furnishing: 'fully',
//     amenities: ['parking', 'wifi', 'ac'],
//     images: ['/images/property1.jpg'],
//     isVerified: true,
//     createdAt: new Date().toISOString()
//   },
//   {
//     id: '2',
//     title: 'PG Accommodation for Boys in Sector 14',
//     description: 'Clean and safe PG with food included',
//     type: 'pg',
//     category: 'rent',
//     price: 8500,
//     location: 'Sector 14',
//     city: 'gurugram',
//     bedrooms: 1,
//     bathrooms: 1,
//     furnishing: 'semi',
//     amenities: ['wifi', 'food'],
//     images: ['/images/property2.jpg'],
//     isVerified: true,
//     createdAt: new Date().toISOString()
//   }
// ]

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url)
    
//     // TODO: Add filtering logic with database
//     // For now, return mock data
    
//     return NextResponse.json({
//       success: true,
//       properties: mockProperties
//     })
    
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Something went wrong' },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json()
    
//     // TODO: Add database logic later
    
//     return NextResponse.json({
//       success: true,
//       message: 'Property created successfully',
//       property: {
//         id: Date.now().toString(),
//         ...body,
//         createdAt: new Date().toISOString()
//       }
//     })
    
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Something went wrong' },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Property from '@/src/models/Property';

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({}).sort({ createdAt: -1 });
    
    console.log('📦 API /api/properties: Returning', properties.length, 'properties');
    
    return NextResponse.json({ 
      success: true, 
      properties 
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}