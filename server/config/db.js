import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (mongoUri && !mongoUri.includes('<db_username>')) {
      const conn = await mongoose.connect(mongoUri);
      console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
    } else {
      console.log('[MongoDB] Connection string template detected. Replace <db_username> and <db_password> in server/.env when ready.');
    }
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
  }
};

export default connectDB;
