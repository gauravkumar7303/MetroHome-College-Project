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

//src/lib/email.js - Centralized email sending functions using Resend API, with error handling and logging
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
// const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// export async function sendVisitConfirmationEmail({ 
//   to, 
//   userName, 
//   visitId, 
//   propertyTitle, 
//   propertyLocation, 
//   preferredDate, 
//   preferredTime, 
//   agentName, 
//   agentPhone, 
//   agentEmail 
// }) {
//   try {
//     // ✅ Fallback for userName (agar undefined ho)
//     const displayName = userName || 'Valued Customer';
    
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
    
//     console.log('📧 Sending email to:', to);
//     console.log('📧 User name:', displayName);
    
//     const { data, error } = await resend.emails.send({
//       from: 'onboarding@resend.dev',  // ✅ Changed: Removed 'MetroHome <...>'
//       to: to,
//       subject: '✓ Visit Confirmed - MetroHome Finder',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; background: #fff; }
//             .header { background: #22c55e; padding: 30px; text-align: center; }
//             .header h1 { color: white; margin: 0; font-size: 28px; }
//             .content { padding: 30px; }
//             .card { background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bbf7d0; }
//             .agent-card { background: #eff6ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bfdbfe; }
//             .btn { display: inline-block; background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
//             .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🏠 MetroHome Finder</h1>
//             </div>
//             <div class="content">
//               <h2>Hello ${displayName},</h2>
//               <p>Your property visit has been <strong style="color: #22c55e;">CONFIRMED</strong>!</p>
              
//               <div class="card">
//                 <h3 style="margin-top: 0; color: #166534;">📋 Visit Details</h3>
//                 <p><strong>Property:</strong> ${propertyTitle}</p>
//                 <p><strong>Location:</strong> ${propertyLocation}</p>
//                 <p><strong>Date:</strong> ${formattedDate}</p>
//                 <p><strong>Time:</strong> ${preferredTime}</p>
//               </div>
              
//               <div class="agent-card">
//                 <h3 style="margin-top: 0; color: #1e40af;">👤 Your MetroHome Representative</h3>
//                 <p><strong>Name:</strong> ${agentName}</p>
//                 <p><strong>Phone:</strong> <a href="tel:${agentPhone}" style="color: #22c55e;">${agentPhone}</a></p>
//                 <p><strong>Email:</strong> ${agentEmail}</p>
//               </div>
              
//               <p style="text-align: center;">
//                 <a href="${APP_URL}/profile/visits" class="btn">📅 View My Visits</a>
//               </p>
//             </div>
//             <div class="footer">
//               <p>Need help? Contact us at <a href="mailto:support@metrohome.com">support@metrohome.com</a></p>
//               <p>&copy; ${new Date().getFullYear()} MetroHome Finder. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });
    
//     if (error) {
//       console.error('❌ Resend error:', error);
//       return { success: false, error };
//     }
    
//     console.log('✅ Email sent successfully to:', to);
//     return { success: true, data };
    
//   } catch (error) {
//     console.error('❌ Send email error:', error);
//     return { success: false, error: error.message };
//   }
// }



import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ✅ Visit Confirmation Email
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
    const displayName = userName || 'Valued Customer';
    
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
    
    console.log('📧 Sending visit confirmation to:', to);
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
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
    
    console.log('✅ Visit confirmation email sent to:', to);
    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Send email error:', error);
    return { success: false, error: error.message };
  }
}

// ✅ NEW - Inquiry Notification to Property Owner
export async function sendInquiryNotification({ 
  to, 
  ownerName, 
  propertyTitle, 
  inquirerName, 
  inquirerEmail, 
  inquirerPhone, 
  message, 
  inquiryId 
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY not set. Inquiry email would be sent to:', to);
      return { success: true, mock: true };
    }
    
    console.log('📧 Sending inquiry notification to owner:', to);
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: '🔔 New Inquiry - MetroHome Finder',
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
            .inquirer-card { background: #eff6ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #bfdbfe; }
            .message-box { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #fde68a; }
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
              <h2>Hello ${ownerName},</h2>
              <p>You have received a <strong style="color: #22c55e;">new inquiry</strong> for your property!</p>
              
              <div class="card">
                <h3 style="margin-top: 0; color: #166534;">🏢 Property Details</h3>
                <p><strong>Property:</strong> ${propertyTitle}</p>
              </div>
              
              <div class="inquirer-card">
                <h3 style="margin-top: 0; color: #1e40af;">👤 Inquirer Details</h3>
                <p><strong>Name:</strong> ${inquirerName}</p>
                <p><strong>Email:</strong> <a href="mailto:${inquirerEmail}" style="color: #22c55e;">${inquirerEmail}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${inquirerPhone}" style="color: #22c55e;">${inquirerPhone}</a></p>
              </div>
              
              <div class="message-box">
                <h3 style="margin-top: 0; color: #92400e;">💬 Message</h3>
                <p style="margin: 0;">"${message}"</p>
              </div>
              
              <p style="text-align: center;">
                <a href="${APP_URL}/profile/inquiries" class="btn">📋 View All Inquiries</a>
              </p>
            </div>
            <div class="footer">
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
    
    console.log('✅ Inquiry notification sent to owner:', to);
    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Send inquiry email error:', error);
    return { success: false, error: error.message };
  }
}

// ✅ NEW - Deal Documents Email
// export async function sendDealDocumentsEmail({ 
//   to, 
//   cc, 
//   tenantName, 
//   ownerName, 
//   propertyTitle, 
//   dealId, 
//   documents, 
//   dealType, 
//   propertyType 
// }) {
//   try {
//     if (!process.env.RESEND_API_KEY) {
//       console.log('⚠️ RESEND_API_KEY not set. Deal email would be sent to:', to);
//       return { success: true, mock: true };
//     }
    
//     console.log('📧 Sending deal documents email to:', to);
    
//     const { data, error } = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to,
//       cc,
//       subject: `📄 ${propertyType} ${dealType === 'rent' ? 'Rent Agreement' : dealType === 'sale' ? 'Sale Deed' : 'PG Agreement'} - MetroHome Finder`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <meta charset="UTF-8">
//           <style>
//             body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//             .container { max-width: 600px; margin: 0 auto; background: #fff; }
//             .header { background: #22c55e; padding: 30px; text-align: center; }
//             .header h1 { color: white; margin: 0; font-size: 28px; }
//             .content { padding: 30px; }
//             .celebration { background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; border: 1px solid #bbf7d0; }
//             .btn { display: inline-block; background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
//             .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>🏠 MetroHome Finder</h1>
//             </div>
//             <div class="content">
//               <h2>🎉 Congratulations ${tenantName}!</h2>
//               <p>Your inquiry for <strong>${propertyTitle}</strong> has been converted to a DEAL!</p>
              
//               <div class="celebration">
//                 <p style="font-size: 48px; margin: 0;">📄</p>
//                 <p style="margin: 10px 0 0 0;">Documents have been generated successfully.</p>
//               </div>
              
//               <p><strong>Documents Generated:</strong></p>
//               <ul>
//                 ${documents.map(doc => `<li>${doc.name}</li>`).join('')}
//               </ul>
              
//               <p style="text-align: center;">
//                 <a href="${APP_URL}/profile/deals/${dealId}" class="btn">📝 View Deal & Documents</a>
//               </p>
//             </div>
//             <div class="footer">
//               <p>&copy; ${new Date().getFullYear()} MetroHome Finder. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     });
    
//     if (error) {
//       console.error('❌ Resend error:', error);
//       return { success: false, error };
//     }
    
//     console.log('✅ Deal documents email sent to:', to);
//     return { success: true, data };
    
//   } catch (error) {
//     console.error('❌ Send deal email error:', error);
//     return { success: false, error: error.message };
//   }
// }

// ✅ FINAL - Deal Documents Email (404 fix + proper document list)
export async function sendDealDocumentsEmail({
  to,
  cc,
  tenantName,
  ownerName,
  propertyTitle,
  dealId,
  documents,
  dealType,
  propertyType
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY not set. Deal email would be sent to:', to);
      return { success: true, mock: true };
    }

    console.log('📧 Sending deal documents email to:', to);

    // Document list as HTML
    const documentListHtml = documents && documents.length
      ? documents.map(doc => `<li style="margin: 5px 0;">📄 ${doc.name}</li>`).join('')
      : '<li>No documents generated</li>';

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      cc,
      subject: `📄 ${propertyType} ${dealType === 'rent' ? 'Rent Agreement' : dealType === 'sale' ? 'Sale Deed' : 'PG Agreement'} - MetroHome Finder`,
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
            .celebration { background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; border: 1px solid #bbf7d0; }
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
              <h2>🎉 Congratulations ${tenantName}!</h2>
              <p>Your inquiry for <strong>${propertyTitle}</strong> has been converted to a DEAL!</p>
              
              <div class="celebration">
                <p style="font-size: 48px; margin: 0;">📄</p>
                <p style="margin: 10px 0 0 0;">Documents have been generated successfully.</p>
              </div>
              
              <p><strong>Documents Generated:</strong></p>
              <ul>
                ${documentListHtml}
              </ul>
              
              <p style="text-align: center;">
                <a href="${APP_URL}/profile/deals/${dealId}" class="btn">📝 View Deal & Documents</a>
              </p>
            </div>
            <div class="footer">
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

    console.log('✅ Deal documents email sent to:', to);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Send deal email error:', error);
    return { success: false, error: error.message };
  }
}