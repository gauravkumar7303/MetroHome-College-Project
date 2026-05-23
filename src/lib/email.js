// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
// const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// export async function sendVisitConfirmationEmail({ to, userName, visitId, propertyTitle, propertyLocation, preferredDate, preferredTime, agentName, agentPhone, agentEmail }) {
//   try {
//     // If no API key, just log and return (don't crash)
//     if (!process.env.RESEND_API_KEY) {
//       console.log('⚠️ RESEND_API_KEY not set. Email would be sent to:', to);
//       return { success: true, mock: true };
//     }
    
//     const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
    
//     const { data, error } = await resend.emails.send({
//       from: 'MetroHome <onboarding@resend.dev>',
//       to,
//       subject: '✓ Visit Confirmed - MetroHome Finder',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <div style="background: #22c55e; padding: 30px; text-align: center;">
//             <h1 style="color: white; margin: 0;">MetroHome Finder</h1>
//           </div>
//           <div style="padding: 30px;">
//             <h2>Hello ${userName},</h2>
//             <p>Your property visit has been <strong>CONFIRMED</strong>!</p>
//             <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; margin: 20px 0;">
//               <p><strong>Property:</strong> ${propertyTitle}</p>
//               <p><strong>Location:</strong> ${propertyLocation}</p>
//               <p><strong>Date:</strong> ${formattedDate}</p>
//               <p><strong>Time:</strong> ${preferredTime}</p>
//             </div>
//             <div style="background: #eff6ff; padding: 20px; border-radius: 10px;">
//               <p><strong>Your MetroHome Representative:</strong> ${agentName}</p>
//               <p><strong>Phone:</strong> ${agentPhone}</p>
//             </div>
//             <p style="margin-top: 30px;">
//               <a href="${APP_URL}/profile/visits" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">View My Visits</a>
//             </p>
//           </div>
//         </div>
//       `
//     });
    
//     if (error) {
//       console.error('Resend error:', error);
//       return { success: false, error };
//     }
    
//     return { success: true, data };
    
//   } catch (error) {
//     console.error('Send email error:', error);
//     return { success: false, error: error.message };
//   }
// }

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function sendVisitConfirmationEmail({ 
  to, 
  userName, 
  visitId, 
  propertyTitle, 
  propertyLocation, 
  preferredDate, 
  preferredTime, 
  agentName, 
  agentPhone, 
  agentEmail 
}) {
  try {
    // ✅ Fallback for userName (agar undefined ho)
    const displayName = userName || 'Valued Customer';
    
    // If no API key, just log and return (don't crash)
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY not set. Email would be sent to:', to);
      return { success: true, mock: true };
    }
    
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    console.log('📧 Sending email to:', to);
    console.log('📧 User name:', displayName);
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',  // ✅ Changed: Removed 'MetroHome <...>'
      to: to,
      subject: '✓ Visit Confirmed - MetroHome Finder',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: #22c55e; padding: 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { padding: 30px; }
            .card { background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bbf7d0; }
            .agent-card { background: #eff6ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bfdbfe; }
            .btn { display: inline-block; background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏠 MetroHome Finder</h1>
            </div>
            <div class="content">
              <h2>Hello ${displayName},</h2>
              <p>Your property visit has been <strong style="color: #22c55e;">CONFIRMED</strong>!</p>
              
              <div class="card">
                <h3 style="margin-top: 0; color: #166534;">📋 Visit Details</h3>
                <p><strong>Property:</strong> ${propertyTitle}</p>
                <p><strong>Location:</strong> ${propertyLocation}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${preferredTime}</p>
              </div>
              
              <div class="agent-card">
                <h3 style="margin-top: 0; color: #1e40af;">👤 Your MetroHome Representative</h3>
                <p><strong>Name:</strong> ${agentName}</p>
                <p><strong>Phone:</strong> <a href="tel:${agentPhone}" style="color: #22c55e;">${agentPhone}</a></p>
                <p><strong>Email:</strong> ${agentEmail}</p>
              </div>
              
              <p style="text-align: center;">
                <a href="${APP_URL}/profile/visits" class="btn">📅 View My Visits</a>
              </p>
            </div>
            <div class="footer">
              <p>Need help? Contact us at <a href="mailto:support@metrohome.com">support@metrohome.com</a></p>
              <p>&copy; ${new Date().getFullYear()} MetroHome Finder. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error };
    }
    
    console.log('✅ Email sent successfully to:', to);
    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Send email error:', error);
    return { success: false, error: error.message };
  }
}