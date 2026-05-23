// import mongoose from 'mongoose';

// const inquirySchema = new mongoose.Schema({
//   // References
//   propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
//   // Property Details (denormalized)
//   propertyTitle: { type: String, required: true },
//   propertyLocation: { type: String, required: true },
//   propertyImage: { type: String, default: '' },
//   propertyPrice: { type: String, default: '' },
  
//   // Inquiry Details
//   message: { type: String, required: true },
//   preferredContactMethod: { 
//     type: String, 
//     enum: ['email', 'phone', 'whatsapp'],
//     default: 'email'
//   },
  
//   // Owner Details (denormalized)
//   ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   ownerName: { type: String },
//   ownerEmail: { type: String },
//   ownerPhone: { type: String },
  
//   // Status
//   status: { 
//     type: String, 
//     enum: ['new', 'contacted', 'viewed', 'negotiation', 'converted', 'lost'],
//     default: 'new'
//   },
  
//   // Deal Conversion
//   dealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', default: null },
//   convertedAt: { type: Date, default: null },
  
//   // Email tracking
//   emailSent: { type: Boolean, default: false },
  
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);


import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyTitle: String,
  propertyLocation: String,
  propertyImage: String,
  propertyPrice: String,
  message: { type: String, required: true },
  preferredContactMethod: { type: String, default: 'email' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerName: String,
  ownerEmail: String,
  ownerPhone: String,
  status: { type: String, default: 'new', enum: ['new', 'contacted', 'viewed', 'negotiation', 'converted', 'lost'] },
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal' },
  convertedAt: Date,
  emailSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);