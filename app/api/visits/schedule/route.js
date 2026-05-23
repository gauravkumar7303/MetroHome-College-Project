

// export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs';

// import { NextResponse } from 'next/server';
// import { connectDB } from '@/src/lib/db';
// import Visit from '@/src/models/Visit';
// import Property from '@/src/models/Property';
// import User from '@/src/models/User';
// import Agent from '@/src/models/Agent';
// import { getUserFromRequest } from '@/src/lib/auth';
// import { sendVisitConfirmationEmail } from '@/src/lib/email';
// import mongoose from 'mongoose';

// // ✅ Get agent from database directly
// async function getAvailableAgent(city) {
//   try {
//     console.log('🔍 Looking for agent in zone:', city);
    
//     // Find agent in same city/zone
//     let agent = await Agent.findOne({ zone: city });
    
//     // If no agent in same zone, get any agent
//     if (!agent) {
//       console.log('⚠️ No agent in zone, getting any agent');
//       agent = await Agent.findOne({});
//     }
    
//     console.log('✅ Found agent:', agent?.name, '| Zone:', agent?.zone);
//     return agent;
    
//   } catch (error) {
//     console.error('Error fetching agent:', error);
//     return null;
//   }
// }

// export async function POST(request) {
//   try {
//     console.log('🚀 [API] POST /api/visits/schedule');
    
//     // 1. Get user from token
//     const userData = await getUserFromRequest(request);
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     // 2. Find user in database
//     let user = await User.findOne({ email: userData.email });
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }
//     console.log('✅ User:', user.email, '| Name:', user.name);
    
//     // 3. Parse request body
//     const { propertyId, preferredDate, preferredTime, message } = await request.json();
    
//     if (!propertyId || !preferredDate || !preferredTime) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }
    
//     // 4. Find property
//     const property = await Property.findById(propertyId);
//     if (!property) {
//       return NextResponse.json({ error: 'Property not found' }, { status: 404 });
//     }
//     console.log('✅ Property:', property.title, '| City:', property.city);
    
//     // 5. Get agent from database
//     const agent = await getAvailableAgent(property.city || 'west_delhi');
//     if (!agent) {
//       console.error('❌ No agent found in database');
//       return NextResponse.json({ error: 'No agents available. Contact support.' }, { status: 503 });
//     }
//     console.log('✅ Agent assigned:', agent.name, '| Phone:', agent.phone);
    
//     // 6. Create visit record
//     const visit = await Visit.create({
//       propertyId: property._id,
//       userId: user._id,
//       propertyTitle: property.title,
//       propertyLocation: property.location,
//       propertyImage: property.images?.[0] || '',
//       preferredDate: new Date(preferredDate),
//       preferredTime,
//       visitorName: user.name || user.email.split('@')[0],
//       visitorPhone: user.phone || 'Not provided',
//       visitorEmail: user.email,
//       message: message || '',
//       assignedAgent: {
//         name: agent.name,
//         phone: agent.phone,
//         email: agent.email,
//         agentId: agent._id
//       },
//       status: 'confirmed'
//     });
//     console.log('✅ Visit created:', visit._id);
    
//     // 7. Update agent's visit count
//     await Agent.findByIdAndUpdate(agent._id, { $inc: { assignedVisits: 1 } });
    
//     // 8. Send email confirmation
//     try {
//       await sendVisitConfirmationEmail({
//         to: user.email,
//         userName: user.name || user.email.split('@')[0],
//         visitId: visit._id.toString(),
//         propertyTitle: property.title,
//         propertyLocation: property.location,
//         preferredDate,
//         preferredTime,
//         agentName: agent.name,
//         agentPhone: agent.phone,
//         agentEmail: agent.email
//       });
//       console.log('📧 Email sent to:', user.email);
//     } catch (emailErr) {
//       console.log('⚠️ Email error (non-blocking):', emailErr.message);
//     }
    
//     // 9. Return success
//     return NextResponse.json({
//       success: true,
//       message: 'Visit scheduled successfully!',
//       visitId: visit._id,
//       assignedAgent: {
//         name: agent.name,
//         phone: agent.phone,
//         email: agent.email
//       },
//       visit: {
//         date: preferredDate,
//         time: preferredTime,
//         propertyTitle: property.title
//       }
//     });
    
//   } catch (error) {
//     console.error('❌ Fatal error:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function GET(request) {
//   try {
//     const userData = await getUserFromRequest(request);
//     if (!userData) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     await connectDB();
    
//     const visits = await Visit.find({ userId: userData.id }).sort({ preferredDate: -1 });
    
//     return NextResponse.json({
//       success: true,
//       visits: visits.map(v => ({
//         id: v._id,
//         propertyTitle: v.propertyTitle,
//         propertyLocation: v.propertyLocation,
//         preferredDate: v.preferredDate,
//         preferredTime: v.preferredTime,
//         status: v.status,
//         assignedAgent: v.assignedAgent
//       }))
//     });
    
//   } catch (error) {
//     console.error('Error fetching visits:', error);
//     return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 });
//   }
// }




// Path: app/api/visits/schedule/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import Visit from '@/src/models/Visit';
import Property from '@/src/models/Property';
import { getUserFromRequest } from '@/src/lib/auth';
import { sendVisitConfirmationEmail } from '@/src/lib/email';
import mongoose from 'mongoose';

async function getUserById(id) {
  const db = mongoose.connection.db;
  return await db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(id) });
}

const AGENTS = [
  { name: 'Priya Sharma', phone: '+91 98765 43210', email: 'priya@metrohome.com', zone: 'west_delhi' },
  { name: 'Rahul Verma', phone: '+91 98765 43211', email: 'rahul@metrohome.com', zone: 'gurugram' },
  { name: 'Anjali Gupta', phone: '+91 98765 43212', email: 'anjali@metrohome.com', zone: 'west_delhi' },
  { name: 'Vikram Singh', phone: '+91 98765 43213', email: 'vikram@metrohome.com', zone: 'gurugram' }
];

function assignAgent(city) {
  const zoneAgents = AGENTS.filter(a => a.zone === city);
  if (zoneAgents.length === 0) return AGENTS[0];
  return zoneAgents[Math.floor(Math.random() * zoneAgents.length)];
}

export async function POST(request) {
  try {
    console.log('🚀 [visits/schedule] POST called');

    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    await connectDB();

    const user = await getUserById(userData.id || userData.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('👤 User:', user.email);

    const { propertyId, preferredDate, preferredTime, alternateDate, alternateTime, message, visitorPhone } = await request.json();

    if (!propertyId || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const agent = assignAgent(property.city || 'west_delhi');
    const phoneNumber = visitorPhone || user.phone || 'Not provided';

    const visit = await Visit.create({
      propertyId: property._id,
      userId: user._id,
      propertyTitle: property.title,
      propertyLocation: property.location || property.address || 'Delhi NCR',
      propertyImage: property.images?.[0] || '',
      preferredDate: new Date(preferredDate),
      preferredTime,
      alternateDate: alternateDate ? new Date(alternateDate) : null,
      alternateTime: alternateTime || null,
      visitorName: user.name,
      visitorPhone: phoneNumber,
      visitorEmail: user.email,
      message: message || '',
      assignedAgent: { name: agent.name, phone: agent.phone, email: agent.email },
      status: 'confirmed'
    });

    console.log('✅ Visit saved:', visit._id.toString());

    // Send email
    let emailSent = false;
    try {
      const emailResult = await sendVisitConfirmationEmail({
        to: user.email,
        userName: user.name,
        visitId: visit._id.toString(),
        propertyTitle: property.title,
        propertyLocation: property.location || property.address || 'Delhi NCR',
        preferredDate,
        preferredTime,
        agentName: agent.name,
        agentPhone: agent.phone,
        agentEmail: agent.email
      });

      if (emailResult.success) {
        emailSent = true;
        visit.emailSent = true;
        visit.emailSentAt = new Date();
        await visit.save();
        console.log('📧 Email sent to:', user.email);
      }
    } catch (emailError) {
      console.error('❌ Email error:', emailError.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Visit scheduled successfully!',
      visitId: visit._id,
      emailSent,
      assignedAgent: { name: agent.name, phone: agent.phone, email: agent.email },
      visit: {
        id: visit._id,
        date: preferredDate,
        time: preferredTime,
        propertyTitle: property.title,
        status: visit.status
      }
    });

  } catch (error) {
    console.error('❌ Schedule visit error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to schedule visit' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = userData.id || userData.userId;

    let query = { visitorEmail: userData.email }; // email se match karo

    if (status === 'upcoming') {
      query.preferredDate = { $gte: new Date() };
      query.status = 'confirmed';
    } else if (status === 'completed') {
      query.status = 'completed';
    } else if (status === 'cancelled') {
      query.status = 'cancelled';
    }

    const visits = await Visit.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      visits: visits.map(v => ({
        id: v._id,
        propertyId: v.propertyId,
        propertyTitle: v.propertyTitle,
        propertyLocation: v.propertyLocation,
        propertyImage: v.propertyImage,
        preferredDate: v.preferredDate,
        preferredTime: v.preferredTime,
        status: v.status,
        assignedAgent: v.assignedAgent,
        createdAt: v.createdAt
      }))
    });

  } catch (error) {
    console.error('Error fetching visits:', error);
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 });
  }
}