// src/lib/email.js - Centralized email sending functions using Resend API

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ✅ 1. Visit Confirmation Email
export async function sendVisitConfirmationEmail({ 
  to, userName, visitId, propertyTitle, propertyLocation, 
  preferredDate, preferredTime, agentName, agentPhone, agentEmail 
}) {
  try {
    const displayName = userName || 'Valued Customer';
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY not set. Email would be sent to:', to);
      return { success: true, mock: true };
    }
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    console.log('📧 Sending visit confirmation to:', to);
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: to,
      subject: '✓ Visit Confirmed - MetroHome Finder',
      html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
        .container{max-width:600px;margin:0 auto;background:#fff}
        .header{background:#22c55e;padding:30px;text-align:center}
        .header h1{color:white;margin:0;font-size:28px}
        .content{padding:30px}
        .card{background:#f0fdf4;padding:20px;border-radius:12px;margin:20px 0;border:1px solid #bbf7d0}
        .agent-card{background:#eff6ff;padding:20px;border-radius:12px;margin:20px 0;border:1px solid #bfdbfe}
        .btn{display:inline-block;background:#22c55e;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;margin-top:20px}
        .footer{text-align:center;padding:20px;font-size:12px;color:#666;border-top:1px solid #eee}
      </style></head><body>
        <div class="container">
          <div class="header"><h1>🏠 MetroHome Finder</h1></div>
          <div class="content">
            <h2>Hello ${displayName},</h2>
            <p>Your property visit has been <strong style="color:#22c55e;">CONFIRMED</strong>!</p>
            <div class="card">
              <h3 style="margin-top:0;color:#166534;">📋 Visit Details</h3>
              <p><strong>Property:</strong> ${propertyTitle}</p>
              <p><strong>Location:</strong> ${propertyLocation}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${preferredTime}</p>
            </div>
            <div class="agent-card">
              <h3 style="margin-top:0;color:#1e40af;">👤 Your MetroHome Representative</h3>
              <p><strong>Name:</strong> ${agentName}</p>
              <p><strong>Phone:</strong> <a href="tel:${agentPhone}" style="color:#22c55e;">${agentPhone}</a></p>
              <p><strong>Email:</strong> ${agentEmail}</p>
            </div>
            <p style="text-align:center;"><a href="${APP_URL}/profile/visits" class="btn">📅 View My Visits</a></p>
          </div>
          <div class="footer"><p>&copy; ${new Date().getFullYear()} MetroHome Finder. All rights reserved.</p></div>
        </div>
      </body></html>`
    });
    if (error) { console.error('❌ Resend error:', error); return { success: false, error }; }
    console.log('✅ Visit confirmation email sent to:', to);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Send email error:', error);
    return { success: false, error: error.message };
  }
}

// ✅ 2. Inquiry Notification to Property Owner
export async function sendInquiryNotification({ 
  to, ownerName, propertyTitle, inquirerName, 
  inquirerEmail, inquirerPhone, message, inquiryId 
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
      html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
        body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
        .container{max-width:600px;margin:0 auto;background:#fff}
        .header{background:#22c55e;padding:30px;text-align:center}
        .header h1{color:white;margin:0;font-size:28px}
        .content{padding:30px}
        .card{background:#f0fdf4;padding:20px;border-radius:12px;margin:20px 0;border:1px solid #bbf7d0}
        .inquirer-card{background:#eff6ff;padding:20px;border-radius:12px;margin:20px 0;border:1px solid #bfdbfe}
        .message-box{background:#fef3c7;padding:15px;border-radius:8px;margin:15px 0;border:1px solid #fde68a}
        .btn{display:inline-block;background:#22c55e;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;margin-top:20px}
        .footer{text-align:center;padding:20px;font-size:12px;color:#666;border-top:1px solid #eee}
      </style></head><body>
        <div class="container">
          <div class="header"><h1>🏠 MetroHome Finder</h1></div>
          <div class="content">
            <h2>Hello ${ownerName},</h2>
            <p>You have received a <strong style="color:#22c55e;">new inquiry</strong> for your property!</p>
            <div class="card">
              <h3 style="margin-top:0;color:#166534;">🏢 Property</h3>
              <p><strong>${propertyTitle}</strong></p>
            </div>
            <div class="inquirer-card">
              <h3 style="margin-top:0;color:#1e40af;">👤 Inquirer Details</h3>
              <p><strong>Name:</strong> ${inquirerName}</p>
              <p><strong>Email:</strong> <a href="mailto:${inquirerEmail}" style="color:#22c55e;">${inquirerEmail}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${inquirerPhone}" style="color:#22c55e;">${inquirerPhone}</a></p>
            </div>
            <div class="message-box">
              <h3 style="margin-top:0;color:#92400e;">💬 Message</h3>
              <p style="margin:0;">"${message}"</p>
            </div>
            <p style="text-align:center;"><a href="${APP_URL}/profile/inquiries" class="btn">📋 View All Inquiries</a></p>
          </div>
          <div class="footer"><p>&copy; ${new Date().getFullYear()} MetroHome Finder. All rights reserved.</p></div>
        </div>
      </body></html>`
    });
    if (error) { console.error('❌ Resend error:', error); return { success: false, error }; }
    console.log('✅ Inquiry notification sent to owner:', to);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Send inquiry email error:', error);
    return { success: false, error: error.message };
  }
}

// ✅ 3. Deal Documents Email - content directly in email body
export async function sendDealDocumentsEmail({
  to, cc, tenantName, ownerName, propertyTitle,
  dealId, documents, dealType, propertyType
}) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ RESEND_API_KEY not set. Deal email would be sent to:', to);
      return { success: true, mock: true };
    }

    console.log('📧 Sending deal documents email to:', to);

    // ✅ Each document as a styled section in email body
    const documentSections = documents && documents.length
      ? documents.map(doc => {
          const iconMap = {
            agreement: '📄',
            stamp_paper: '🔏',
            id_proof: '🪪',
            'e-sign': '✍️'
          };
          const icon = iconMap[doc.type] || '📄';
          // Convert plain text content to HTML (preserve line breaks)
          const contentHtml = (doc.content || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');

          return `
            <div style="margin:24px 0;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
              <div style="background:#f0fdf4;padding:16px 20px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:10px;">
                <span style="font-size:24px;">${icon}</span>
                <div>
                  <div style="font-weight:700;font-size:16px;color:#166534;">${doc.name}</div>
                  <div style="font-size:12px;color:#6b7280;text-transform:capitalize;">${(doc.type || '').replace('_', ' ')}</div>
                </div>
              </div>
              <div style="padding:20px;background:#fff;font-family:monospace;font-size:13px;line-height:1.8;color:#374151;white-space:pre-wrap;">
                ${contentHtml}
              </div>
            </div>
          `;
        }).join('')
      : '<p style="color:#9ca3af;">No documents generated.</p>';

    const subject = `📄 ${propertyType || ''} ${
      dealType === 'rent' ? 'Rent Agreement' : 
      dealType === 'sale' ? 'Sale Deed' : 'PG Agreement'
    } Documents - MetroHome Finder`;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 700px; margin: 0 auto; background: #fff; }
            .header { background: #22c55e; padding: 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { padding: 30px; }
            .celebration { background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0; border: 1px solid #bbf7d0; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 20px 0; }
            .meta-item { background: #f9fafb; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .meta-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
            .meta-value { font-size: 15px; font-weight: 700; color: #111827; margin-top: 2px; }
            .btn { display: inline-block; background: #22c55e; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; margin-top: 30px; }
            .divider { border: none; border-top: 2px dashed #e5e7eb; margin: 30px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏠 MetroHome Finder</h1>
            </div>
            <div class="content">
              <div class="celebration">
                <p style="font-size:40px;margin:0;">🎉</p>
                <h2 style="margin:10px 0 4px;">Congratulations ${tenantName || 'Tenant'}!</h2>
                <p style="margin:0;color:#166534;">Your deal for <strong>${propertyTitle}</strong> is confirmed.</p>
              </div>

              <div class="meta-grid">
                <div class="meta-item">
                  <div class="meta-label">Property</div>
                  <div class="meta-value">${propertyTitle}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Deal Type</div>
                  <div class="meta-value" style="text-transform:capitalize;">${dealType}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Owner</div>
                  <div class="meta-value">${ownerName || '—'}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Documents</div>
                  <div class="meta-value">${documents?.length || 0} Generated</div>
                </div>
              </div>

              <hr class="divider">

              <h3 style="color:#111827;margin-bottom:8px;">📋 Your Documents</h3>
              <p style="color:#6b7280;font-size:14px;margin-top:0;">All documents are included below for your reference.</p>

              ${documentSections}

              <p style="text-align:center;margin-top:30px;">
                <a href="${APP_URL}/profile/deals" class="btn">📁 View All Deals</a>
              </p>
            </div>
            <div class="footer">
              <p>This email was generated by MetroHome Finder.</p>
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