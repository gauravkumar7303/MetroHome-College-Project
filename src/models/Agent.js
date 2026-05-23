import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  zone: { type: String, enum: ['west_delhi', 'gurugram'], required: true },
  isActive: { type: Boolean, default: true },
  profilePicture: { type: String, default: '' },
  joiningDate: { type: Date, default: Date.now },
  assignedVisits: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
});

export default mongoose.models.Agent || mongoose.model('Agent', agentSchema);