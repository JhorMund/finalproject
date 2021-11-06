import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  orderItems: [{
    name: String,
    quantity: Number,
    image: String,
    price: Number,
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    numberPhone: Number,
  },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false},
  isDelivered: { type: Boolean, required: true, default: false},
  PaidAt: { type: Date},
  DeliveredAt: { type: Date},
},{
  timestamps :true
});

const Order = 
  mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;