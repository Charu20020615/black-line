import mongoose from 'mongoose';

// Cache the connection for serverless functions
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Validate MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    const error = new Error(
      'MONGODB_URI environment variable is not set. Please set it in Railway dashboard under Variables.'
    );
    console.error('❌ MongoDB Configuration Error:', error.message);
    console.error('📝 To fix: Go to Railway → Your Backend Service → Variables → Add MONGODB_URI');
    throw error;
  }

  // If already connected, return existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected');
      return mongoose;
    }).catch((error) => {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;


