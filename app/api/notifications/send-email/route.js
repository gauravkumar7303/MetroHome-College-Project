// import { NextResponse } from 'next/server'
// import { Resend } from 'resend'

// // Initialize Resend with your API key
// const resend = new Resend(process.env.RESEND_API_KEY)

// // Email templates
// const emailTemplates = {
//   visit_confirmation: (data) => ({
//     subject: 'Visit Confirmed - MetroHome Finder',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center;">
//           <h1 style="color: white; margin: 0;">MetroHome Finder</h1>
//         </div>
        
//         <div style="padding: 30px; background: #fff;">
//           <h2>Hello ${data.userName},</h2>
//           <p>Your property visit has been <strong>confirmed</strong>!</p>
          
//           <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
//             <h3 style="margin: 0 0 10px 0; color: #166534;">Visit Details</h3>
//             <p><strong>Property:</strong> ${data.propertyTitle}</p>
//             <p><strong>Date:</strong> ${data.date}</p>
//             <p><strong>Time:</strong> ${data.time}</p>
//           </div>
          
//           <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
//             <h3 style="margin: 0 0 10px 0; color: #166534;">Your MetroHome Representative</h3>
//             <p><strong>Name:</strong> ${data.agentName}</p>
//             <p><strong>Phone:</strong> ${data.agentPhone}</p>
//           </div>
          
//           <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0;">
//             <h3 style="margin: 0 0 10px 0; color: #92400e;">Important Instructions</h3>
//             <ul style="margin: 0; padding-left: 20px;">
//               <li>Please carry a valid ID proof</li>
//               <li>Arrive 5-10 minutes before scheduled time</li>
//               <li>Our representative will meet you at the property entrance</li>
//             </ul>
//           </div>
          
//           <p style="margin-top: 30px; text-align: center;">
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/visits" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View Your Visits</a>
//           </p>
//         </div>
//       </div>
//     `
//   }),

//   visit_reminder: (data) => ({
//     subject: 'Visit Reminder - Tomorrow at MetroHome',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
//           <h2 style="color: white;">Visit Reminder</h2>
//         </div>
        
//         <div style="padding: 30px;">
//           <h2>Reminder: Property Visit Tomorrow</h2>
//           <p><strong>Property:</strong> ${data.propertyTitle}</p>
//           <p><strong>Date:</strong> ${data.date}</p>
//           <p><strong>Time:</strong> ${data.time}</p>
//           <p><strong>Location:</strong> ${data.location}</p>
//         </div>
//       </div>
//     `
//   }),

//   inquiry_received: (data) => ({
//     subject: 'New Inquiry Received - MetroHome Finder',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
//           <h2 style="color: white;">New Inquiry</h2>
//         </div>
        
//         <div style="padding: 30px;">
//           <h2>Hello ${data.ownerName},</h2>
//           <p>You have received a new inquiry for your property:</p>
//           <p><strong>Property:</strong> ${data.propertyTitle}</p>
//           <p><strong>From:</strong> ${data.inquirerName}</p>
//           <p><strong>Message:</strong> ${data.message}</p>
          
//           <p style="margin-top: 20px;">
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/inquiries" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View Inquiry</a>
//           </p>
//         </div>
//       </div>
//     `
//   }),

//   deal_converted: (data) => ({
//     subject: 'Congratulations! Your inquiry converted to a DEAL',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
//           <h2 style="color: white;">🎉 Congratulations!</h2>
//         </div>
        
//         <div style="padding: 30px;">
//           <h2>Your inquiry has been converted to a DEAL!</h2>
//           <p><strong>Property:</strong> ${data.propertyTitle}</p>
//           <p><strong>Agreed Price:</strong> ₹${data.agreedPrice}</p>
          
//           <p style="margin-top: 20px;">
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/deals/${data.dealId}" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View Deal Details</a>
//           </p>
//         </div>
//       </div>
//     `
//   })
// }

// export async function POST(request) {
//   try {
//     const { to, type, data } = await request.json()

//     if (!to || !type) {
//       return NextResponse.json(
//         { error: 'Missing required fields: to, type' },
//         { status: 400 }
//       )
//     }

//     // Check if RESEND_API_KEY is configured
//     if (!process.env.RESEND_API_KEY) {
//       console.warn('RESEND_API_KEY not configured. Email not sent.')
//       return NextResponse.json(
//         { success: false, message: 'Email service not configured' },
//         { status: 200 }
//       )
//     }

//     const template = emailTemplates[type]
//     if (!template) {
//       return NextResponse.json(
//         { error: 'Invalid email type' },
//         { status: 400 }
//       )
//     }

//     const emailData = template(data)
    
//     const { error } = await resend.emails.send({
//       from: 'MetroHome <noreply@metrohome.com>',
//       to,
//       subject: emailData.subject,
//       html: emailData.html
//     })

//     if (error) {
//       console.error('Email sending error:', error)
//       return NextResponse.json(
//         { error: 'Failed to send email' },
//         { status: 500 }
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Email sent successfully'
//     })

//   } catch (error) {
//     console.error('Email API error:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email templates
const emailTemplates = {
  visit_confirmation: (data) => ({
    subject: 'Visit Confirmed - MetroHome Finder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">MetroHome Finder</h1>
        </div>
        
        <div style="padding: 30px; background: #fff;">
          <h2>Hello ${data.userName},</h2>
          <p>Your property visit has been <strong>confirmed</strong>!</p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #166534;">Visit Details</h3>
            <p><strong>Property:</strong> ${data.propertyTitle}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #166534;">Your MetroHome Representative</h3>
            <p><strong>Name:</strong> ${data.agentName}</p>
            <p><strong>Phone:</strong> ${data.agentPhone}</p>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #92400e;">Important Instructions</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Please carry a valid ID proof</li>
              <li>Arrive 5-10 minutes before scheduled time</li>
              <li>Our representative will meet you at the property entrance</li>
            </ul>
          </div>
          
          <p style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/visits" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View Your Visits</a>
          </p>
        </div>
      </div>
    `
  }),

  visit_reminder: (data) => ({
    subject: 'Visit Reminder - Tomorrow at MetroHome',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
          <h2 style="color: white;">Visit Reminder</h2>
        </div>
        
        <div style="padding: 30px;">
          <h2>Reminder: Property Visit Tomorrow</h2>
          <p><strong>Property:</strong> ${data.propertyTitle}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Location:</strong> ${data.location}</p>
        </div>
      </div>
    `
  }),

  inquiry_received: (data) => ({
    subject: 'New Inquiry Received - MetroHome Finder',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
          <h2 style="color: white;">New Inquiry</h2>
        </div>
        
        <div style="padding: 30px;">
          <h2>Hello ${data.ownerName},</h2>
          <p>You have received a new inquiry for your property:</p>
          <p><strong>Property:</strong> ${data.propertyTitle}</p>
          <p><strong>From:</strong> ${data.inquirerName}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/inquiries" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View Inquiry</a>
          </p>
        </div>
      </div>
    `
  }),

  deal_converted: (data) => ({
    subject: 'Congratulations! Your inquiry converted to a DEAL',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; text-align: center;">
          <h2 style="color: white;">🎉 Congratulations!</h2>
        </div>
        
        <div style="padding: 30px;">
          <h2>Your inquiry has been converted to a DEAL!</h2>
          <p><strong>Property:</strong> ${data.propertyTitle}</p>
          <p><strong>Agreed Price:</strong> ₹${data.agreedPrice}</p>
          
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/deals/${data.dealId}" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View Deal Details</a>
          </p>
        </div>
      </div>
    `
  })
}

export async function POST(request) {
  try {
    const { to, type, data } = await request.json()

    if (!to || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: to, type' },
        { status: 400 }
      )
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email not sent.')
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 200 }
      )
    }

    const template = emailTemplates[type]
    if (!template) {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      )
    }

    const emailData = template(data)
    
    // ✅ FIXED: Changed from address
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',  // ← YAHAN CHANGE KIYA
      to,
      subject: emailData.subject,
      html: emailData.html
    })

    if (error) {
      console.error('Email sending error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}