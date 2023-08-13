import mongoose, { Document, Schema } from 'mongoose';

interface ISupplier extends Document {
    name: string;
    description?: string;
    location: string;
    products: Array<Schema.Types.ObjectId>; // References to the products this supplier offers
    contactEmail: string;
    contactPhone: string;
}

const SupplierSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    }
});

const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema);
export default Supplier;
