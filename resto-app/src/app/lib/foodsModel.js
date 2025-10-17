const { default: mongoose } = require("mongoose");

const foodModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img_path: { type: String, required: true },
    description: { type: String, required: true },
    resto_id: mongoose.Schema.Types.ObjectId,
},{
    timestamps: true,
  collection: 'foods'
});


export const foodSchema = mongoose.models.foods || mongoose.model("foods", foodModel);
