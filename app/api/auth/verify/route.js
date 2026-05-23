// Path: app/api/auth/verify/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/verify called');

  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const result = await AuthService.verifyEmail(email, otp.toString().trim());
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('💥 Verify API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Verification failed' },
      { status: 400 }
    );
  }
}