import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connecting to Database
  await connectDB();

  // Starting the Express server
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();