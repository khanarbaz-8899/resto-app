import mongoose from "mongoose";

const deliveryPartnersSchema = new mongoose.Schema({
   name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  address: { type: String },
  contact: { type: String },
});

export default mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnersSchema);
