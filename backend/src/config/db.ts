import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // MONGO_URI is injected via docker-compose.yml environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB:`, error);
    // Exit with failure
    process.exit(1); 
  }
};