import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
  name: { type: String, required:true },
  pid: { type: String, required:true, unique: true },
  category: { type: String, required:true },
  image: { type: String, required:true },
  price: { type: Number, required:true },
  countInStock: { type: Number, required:true },
  description: { type: String, required:true, default: 0 },
  ukuran: { type: String, required:true },
},{
  timestamps :true
});

const Product2 = 
  mongoose.models.Product2 || mongoose.model('Product2', productSchema);
export default Product2;