import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    supplier: Schema.Types.ObjectId; // Reference to the supplier
    mainImage: string; // URL for the main product image
    additionalImages: string[]; // Array of URLs for additional images
    featured: boolean;
    
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
    },
    mainImage: {
        type: String,
        required: true // or false, depending on your use case
    },
    additionalImages: {
        type: [String], // Array of strings
        required: false // or true, depending on your use case
    },
    featured: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
