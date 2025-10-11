import mongoose from "mongoose";

const { DB_USERNAME, DB_PASSWORD } = process.env;

if (!DB_USERNAME || !DB_PASSWORD) {
  throw new Error("Missing DB_USERNAME or DB_PASSWORD in environment variables!");
}

export const connectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.fxowetc.mongodb.net/restodb?retryWrites=true&w=majority`;

export const connectDb = async () => {
  try {
    await mongoose.connect(connectionStr);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌", err);
  }
};
