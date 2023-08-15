import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    supplier: Schema.Types.ObjectId; // Reference to the supplier
    // Add other fields as needed
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    }
    // Add other fields as needed
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;

