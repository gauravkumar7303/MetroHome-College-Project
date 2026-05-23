// // Path: app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/src/lib/db';
// import User from '@/src/lib/User.model';
// import jwt from 'jsonwebtoken';

// export async function POST(request) {
//   console.log('🚀 [API] /api/auth/login called');

//   try {
//     const body = await request.json();
//     const { email, password } = body;

//     // Validation
//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { success: false, error: 'Please enter a valid email address' },
//         { status: 400 }
//       );
//     }

//     // Connect DB
//     await connectDB();

//     // Find user
//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Check password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid email or password' },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     console.log('✅ Login successful for:', email);

//     return NextResponse.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     }, { status: 200 });

//   } catch (error) {
//     console.error('💥 Login API error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Login failed. Please try again.' },
//       { status: 500 }
//     );
//   }
// }

// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   });
// }


// Path: app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { AuthService } from '@/src/services/auth.service';

export async function POST(request) {
  console.log('🚀 [API] /api/auth/login called');

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
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

    const result = await AuthService.loginUser(email, password);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('💥 Login API error:', error);

    if (error.message === 'Invalid email or password') {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (error.message.includes('verify your email')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}