// Path: app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/register called');

  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const result = await AuthService.registerUser({ name: name.trim(), email: email.trim().toLowerCase(), password });

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('💥 Register API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 400 }
    );
  }
}