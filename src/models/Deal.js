// import mongoose from 'mongoose';

// const dealSchema = new mongoose.Schema({
//   // References
//   propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
//   ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry' },
  
//   // Deal Details
//   dealType: { type: String, enum: ['rent', 'sale'], required: true },
//   agreedPrice: { type: Number, required: true },
//   securityDeposit: Number,
//   startDate: Date,
//   endDate: Date,
//   duration: Number, // in months
  
//   // Payment Terms
//   paymentFrequency: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: 'monthly' },
//   paymentDay: Number, // day of month
  
//   // Documents
//   documents: [{
//     type: String, // 'agreement', 'stamp_paper', 'e-sign', 'id_proof'
//     url: String,
//     uploadedAt: Date,
//     verified: { type: Boolean, default: false }
//   }],
  
//   // Agreement Details
//   agreementId: String,
//   agreementSignedAt: Date,
//   agreementUrl: String,
  
//   // Status
//   status: {
//     type: String,
//     enum: ['negotiation', 'agreement_draft', 'agreement_signed', 'active', 'completed', 'terminated'],
//     default: 'negotiation'
//   },
  
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// export default mongoose.models.Deal || mongoose.model('Deal', dealSchema);



import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  // References
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry' },
  
  // Deal Details
  dealType: { type: String, enum: ['rent', 'sale'], required: true },
  propertyType: { type: String },
  agreedPrice: { type: Number, required: true },
  securityDeposit: Number,
  startDate: Date,
  endDate: Date,
  duration: Number, // in months
  
  // Payment Terms
  paymentFrequency: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: 'monthly' },
  paymentDay: Number,
  
  // ✅ FIXED: documents schema matches generateDocuments() output
  documents: [{
    type: { type: String }, // 'agreement', 'stamp_paper', 'id_proof', 'e-sign'
    name: { type: String }, // filename e.g. 'Rent_Agreement.pdf'
    content: { type: String }, // text content of the document
    url: { type: String },    // optional: if stored on cloud
    generatedAt: { type: Date },
    uploadedAt: { type: Date },
    verified: { type: Boolean, default: false }
  }],
  
  // Agreement Details
  agreementId: String,
  agreementSignedAt: Date,
  agreementUrl: String,
  
  // Status
  status: {
    type: String,
    enum: ['negotiation', 'agreement_draft', 'agreement_signed', 'active', 'completed', 'terminated'],
    default: 'negotiation'
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Deal || mongoose.model('Deal', dealSchema);