// Path: src/services/email.service.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {

  // OTP verification email
  static async sendOTP(email, otp) {
    try {
      console.log('📧 Sending OTP to:', email);

      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Your MetroHome Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
            <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <h1 style="color: #16a34a; text-align: center; margin-bottom: 8px;">MetroHome Finder</h1>
              <p style="color: #6b7280; text-align: center; margin-bottom: 32px; font-size: 14px;">Find your perfect home in the city</p>
              <h2 style="color: #111827; font-size: 20px; margin-bottom: 8px;">Email Verification</h2>
              <p style="color: #374151; font-size: 16px;">Hello! Please use the OTP below to verify your email address.</p>
              <div style="background: #f0fdf4; border: 2px dashed #16a34a; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0;">Your verification code</p>
                <h2 style="color: #16a34a; margin: 0; font-size: 42px; letter-spacing: 12px; font-weight: bold;">${otp}</h2>
              </div>
              <p style="color: #6b7280; font-size: 14px;">⏰ This code expires in <strong>10 minutes</strong>.</p>
              <p style="color: #6b7280; font-size: 14px;">If you didn't create a MetroHome account, you can safely ignore this email.</p>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="color: #9ca3af; font-size: 13px; text-align: center;">© MetroHome Finder Team</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        if (process.env.NODE_ENV === 'development') {
          console.log(`\n[DEV MODE] OTP for ${email}: ${otp}\n`);
          return true;
        }
        throw error;
      }

      console.log('✅ OTP email sent! ID:', data?.id);
      return true;

    } catch (error) {
      console.error('💥 sendOTP failed:', error);
      // Development mein fail hone pe bhi console mein dikhao
      if (process.env.NODE_ENV === 'development') {
        console.log(`\n[DEV MODE] OTP for ${email}: ${otp}\n`);
        return true;
      }
      return false;
    }
  }

  // Welcome email after verification
  static async sendWelcomeEmail(email, name) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: `Welcome to MetroHome, ${name}! 🏠`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
            <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <h1 style="color: #16a34a; text-align: center; margin-bottom: 8px;">MetroHome Finder 🏠</h1>
              <p style="color: #6b7280; text-align: center; font-size: 14px; margin-bottom: 32px;">Find your perfect home in the city</p>

              <h2 style="color: #111827;">Welcome aboard, ${name}! 🎉</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for joining MetroHome Finder! Your email has been successfully verified and your account is now active.
              </p>

              <div style="background: #f0fdf4; border-radius: 10px; padding: 20px; margin: 24px 0;">
                <p style="color: #16a34a; font-weight: bold; margin: 0 0 12px 0;">What you can do now:</p>
                <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 2;">
                  <li>🔍 Browse thousands of properties</li>
                  <li>❤️ Save your favourite listings</li>
                  <li>📞 Connect with property owners</li>
                  <li>🗺️ Explore properties by metro stations</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
                   style="display: inline-block; background: #16a34a; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Start Exploring 🏠
                </a>
              </div>

              <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="color: #9ca3af; font-size: 13px; text-align: center;">
                With love,<br><strong>MetroHome Finder Team</strong>
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Welcome email error:', error);
        return false;
      }

      console.log('✅ Welcome email sent to:', email);
      return true;

    } catch (error) {
      console.error('Welcome email failed:', error);
      return false;
    }
  }
}