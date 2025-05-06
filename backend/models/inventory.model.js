import mongoose from "mongoose";



const cateringSchema = new mongoose.Schema({
    p_id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
  });
  
const CateringModel = mongoose.model("Payment", cateringSchema);

export default CateringModel;
