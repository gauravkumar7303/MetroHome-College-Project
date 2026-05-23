import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 [db.js] Initializing...');
console.log('Node Environment:', process.env.NODE_ENV);
console.log('MONGODB_URI exists:', !!MONGODB_URI);

if (!MONGODB_URI) {
  console.error('❌ FATAL: MONGODB_URI is not defined!');
  throw new Error('Please define MONGODB_URI in .env.local file');
}

console.log('🔗 MongoDB URI loaded:');
console.log('Database:', MONGODB_URI.split('/').pop().split('?')[0]);
console.log('Host:', MONGODB_URI.split('@')[1]?.split('/')[0]);

// Optimized connection caching
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
    isConnecting: false
  };
}

export async function connectDB() {
  // If already connected, return connection
  if (cached.conn) {
    console.log('♻️ Using existing MongoDB connection');
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (cached.promise && cached.isConnecting) {
    console.log('⏳ Connection in progress, waiting...');
    return await cached.promise;
  }

  // Create new connection
  console.log('🔄 Establishing new MongoDB connection...');
  cached.isConnecting = true;

  cached.promise = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 60000,
    maxPoolSize: 10,
    minPoolSize: 5,
    retryWrites: true,
    w: 'majority',
    retryReads: true,
  })
    .then((mongooseInstance) => {
      console.log('✅ MongoDB Connected Successfully!');
      console.log('📊 Database:', mongooseInstance.connection.db?.databaseName);
      console.log('🏠 Host:', mongooseInstance.connection.host);

      mongooseInstance.connection.on('error', (err) => {
        console.error('❌ Mongoose connection error:', err.message);
      });

      mongooseInstance.connection.on('disconnected', () => {
        console.log('🔌 Mongoose disconnected from DB');
      });

      return mongooseInstance;
    })
    .catch((error) => {
      console.error('❌ MongoDB Connection Failed:', error.message);

      if (error.name === 'MongoServerSelectionError') {
        console.error('💡 Fix: MongoDB Atlas > Network Access > Add IP 0.0.0.0/0');
      } else if (error.name === 'MongoParseError') {
        console.error('💡 Fix: Check MONGODB_URI format in .env.local');
      }

      cached.isConnecting = false;
      cached.promise = null;
      throw error;
    });

  try {
    cached.conn = await cached.promise;
    cached.isConnecting = false;
    return cached.conn;
  } catch (error) {
    cached.isConnecting = false;
    cached.promise = null;
    throw error;
  }
}

export { mongoose };
