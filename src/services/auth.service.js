// Path: src/services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/src/lib/User.model';
import { EmailService } from '@/src/services/email.service';
import { connectDB } from '@/src/lib/db';

export class AuthService {

  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Register - save user + send OTP
  static async registerUser(userData) {
    console.log('🔐 [AuthService] Registering:', userData.email);

    await connectDB();
    const { email, password, name } = userData;

    // Already exists check
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        throw new Error('This email is already registered. Please login.');
      } else {
        // Already registered but not verified — resend OTP
        const otp = this.generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        existingUser.verificationOTP = otp;
        existingUser.otpExpiry = otpExpiry;
        await existingUser.save();
        await EmailService.sendOTP(email, otp);
        return {
          success: true,
          message: 'OTP resent to your email.',
          email,
          requiresVerification: true,
        };
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = this.generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    console.log(`🔐 OTP for ${email}: ${otp}`);

    // Save user
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      isEmailVerified: false,
      verificationOTP: otp,
      otpExpiry,
    });

    await user.save();
    console.log('✅ User saved:', user._id);

    // Send OTP email
    try {
      await EmailService.sendOTP(email, otp);
      console.log('✅ OTP email sent!');
    } catch (emailError) {
      console.error('⚠️ OTP email failed:', emailError.message);
    }

    return {
      success: true,
      message: 'Registration successful! OTP sent to your email.',
      email,
      requiresVerification: true,
    };
  }

  // Verify OTP
  static async verifyEmail(email, otp) {
    console.log('✅ [AuthService] Verifying OTP for:', email);

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new Error('User not found');
    if (user.isEmailVerified) throw new Error('Email already verified. Please login.');
    if (!user.verificationOTP) throw new Error('No pending verification. Please register again.');
    if (new Date() > user.otpExpiry) {
      user.verificationOTP = undefined;
      user.otpExpiry = undefined;
      await user.save();
      throw new Error('OTP expired. Please register again to get a new OTP.');
    }
    if (user.verificationOTP !== otp) throw new Error('Invalid OTP. Please try again.');

    // Mark verified
    user.isEmailVerified = true;
    user.verificationOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();
    console.log('✅ Email verified for:', email);

    // Send welcome email
    try {
      await EmailService.sendWelcomeEmail(email, user.name);
      console.log('✅ Welcome email sent!');
    } catch (e) {
      console.error('⚠️ Welcome email failed:', e.message);
    }

    return {
      success: true,
      message: 'Email verified successfully! Please login.',
    };
  }

  // Resend OTP
  static async resendOTP(email) {
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new Error('User not found');
    if (user.isEmailVerified) throw new Error('Email already verified. Please login.');

    const otp = this.generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.verificationOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await EmailService.sendOTP(email, otp);
    console.log('✅ OTP resent to:', email);

    return { success: true, message: 'New OTP sent to your email.' };
  }

  // Login
  static async loginUser(email, password) {
    console.log('🔐 [AuthService] Login:', email);

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) throw new Error('Invalid email or password');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid email or password');

    if (!user.isEmailVerified) {
      throw new Error('Please verify your email first. Check your inbox for the OTP.');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful:', email);

    return {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}