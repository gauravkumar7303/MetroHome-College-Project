import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'metrohome_super_secret_key_2026';

// Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Compare password with hash
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user) {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Get user from request cookies
export async function getUserFromRequest(request) {
  try {
    // Get token from cookies
    const token = request.cookies.get('metrohome_token')?.value;
    
    if (!token) {
      console.log('🔐 No token found in cookies');
      return null;
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      console.log('🔐 Invalid token');
      return null;
    }
    
    console.log('🔐 User authenticated:', decoded.email);
    return decoded;
    
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
}

// Generate OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}