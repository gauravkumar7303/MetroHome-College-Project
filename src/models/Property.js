import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  // Basic Info
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  // Property Type - ENHANCED
  propertyType: {
    type: String,
    enum: ['apartment', 'pg', 'flat', 'villa', 'commercial', 'land', 'room'],
    required: true
  },
  
  // Sub-category for PG/Hostel specific
  pgType: {
    type: String,
    enum: ['boys', 'girls', 'co-ed', 'family', null],
    default: null
  },
  
  // Category
  category: { type: String, enum: ['rent', 'sale'], required: true },
  
  // Price Details
  price: { type: Number, required: true },
  securityDeposit: { type: Number, default: 0 },
  maintenanceFee: { type: Number, default: 0 },
  
  // Location
  location: { type: String, required: true },
  city: { type: String, enum: ['west_delhi', 'gurugram'], required: true },
  landmark: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  
  // Property Details
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  areaSqft: Number,
  furnishing: { type: String, enum: ['fully', 'semi', 'unfurnished'], default: 'semi' },
  floorNumber: Number,
  totalFloors: Number,
  
  // PG/Hostel Specific Fields
  pgAmenities: {
    mealsIncluded: { type: Boolean, default: false },
    mealType: { type: String, enum: ['veg', 'non-veg', 'both', null], default: null },
    sharingOptions: [String], // ['single', 'double', 'triple', 'dorm']
    occupancy: Number,
    curfew: String,
    housekeeping: { type: Boolean, default: false }
  },
  
  // Commercial Specific
  commercialType: {
    type: String,
    enum: ['office', 'shop', 'warehouse', 'showroom', null],
    default: null
  },
  
  // Amenities (Common)
  amenities: [{
    name: String,
    included: { type: Boolean, default: true },
    charges: Number
  }],
  
  // Rules & Restrictions
  rules: {
    petsAllowed: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: true },
    visitorsAllowed: { type: Boolean, default: true },
    bachelorAllowed: { type: Boolean, default: true },
    familyAllowed: { type: Boolean, default: true }
  },
  
  // Media
  images: [String],
  videoUrl: String,
  virtualTourUrl: String,
  
  // Verification & Status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'physical_visit_done'],
    default: 'pending'
  },
  
  // Listing Details
  listerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Stats
  views: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model('Property', propertySchema);