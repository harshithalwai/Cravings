import mongoose from "mongoose";
import debug from "debug";
const log = debug('development:DB');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI).then(() => {
      log("MongoDB connected")
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;