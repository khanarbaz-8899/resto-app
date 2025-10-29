import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  address: { type: String },
  contact: { type: String },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
