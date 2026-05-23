import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  // References
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Property Details (denormalized for quick access)
  propertyTitle: { type: String, required: true },
  propertyLocation: { type: String, required: true },
  propertyImage: { type: String, default: '' },
  
  // Visit Details
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  alternateDate: { type: Date, default: null },
  alternateTime: { type: String, default: null },
  
  // Visitor Details
  visitorName: { type: String, required: true },
  visitorPhone: { type: String, required: true },
  visitorEmail: { type: String, required: true },
  message: { type: String, default: '' },
  
  // MetroHome Agent Assignment
  assignedAgent: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  
  // Status
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'confirmed'
  },
  
  // Visit Report (after visit is done)
  report: {
    visitedAt: Date,
    feedback: String,
    rating: { type: Number, min: 1, max: 5 },
    ownerContactRevealed: { type: Boolean, default: false },
    notes: String
  },
  
  // Email tracking
  emailSent: { type: Boolean, default: false },
  emailSentAt: Date,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Visit || mongoose.model('Visit', visitSchema);