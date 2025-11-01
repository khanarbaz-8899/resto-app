import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  foodItemId: mongoose.Schema.Types.ObjectId,
  restaurantId: mongoose.Schema.Types.ObjectId,
  deliveryBoyId: mongoose.Schema.Types.ObjectId,
  status: String,
  amount: String,
});

const OrderModel =
  mongoose.models.orders || mongoose.model("orders", orderSchema);

export default OrderModel;
