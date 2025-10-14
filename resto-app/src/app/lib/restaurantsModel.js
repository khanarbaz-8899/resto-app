const { default: mongoose } = require("mongoose");

const restaurantModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  address: { type: String },
  contact: { type: String },
}, { 
  timestamps: true,
  collection: 'restaurants' // explicitly set collection name
});

// ✅ Prevent model recompilation
export const restaurantSchema =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);