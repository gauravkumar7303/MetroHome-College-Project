import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['seeker', 'lister', 'admin'], default: 'seeker' },
  isVerified: { type: Boolean, default: false },
  profilePicture: { type: String, default: '' },
  otp: String,
  otpExpiry: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', userSchema);