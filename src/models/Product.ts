import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  supplier: Schema.Types.ObjectId; // Reference to the Supplier
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier', // Reference to the Supplier model
    required: true,
  },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
