import mongoose, { Document, Schema } from 'mongoose';

interface ISupplier extends Document {
    name: string;
    description?: string;
    category: string;
    location: string;
    products: Array<Schema.Types.ObjectId>; // References to the products this supplier offers
    contactEmail: string;
    contactPhone: string;
}

const SupplierSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2, // Minimum length
        maxlength: 50 // Maximum length
    },
    category: {
        type: String,
        required: true,
        default: 'DefaultCategory',
        enum: ['Indumentaria', 'Alimentación', 'DefaultCategory'] // Predefined categories
    },
    description: {
        type: String,
        maxlength: 200 // Example maximum length
    },
    location: {
        type: String,
        required: true,
        maxlength: 100 // Example maximum length
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    contactEmail: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Email pattern matching
    },
    contactPhone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid phone number'], // Example for 10-digit phone number
    }
});

const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema);
export default Supplier;
