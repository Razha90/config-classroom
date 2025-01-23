import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error("Could not connect to MongoDB");
  }
};

export default connectDb;
