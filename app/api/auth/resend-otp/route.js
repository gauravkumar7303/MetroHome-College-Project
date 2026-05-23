// Path: app/api/auth/resend-otp/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/src/services/auth.service';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }
    const result = await AuthService.resendOTP(email);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}