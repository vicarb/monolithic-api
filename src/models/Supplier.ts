// src/models/Supplier.ts
import mongoose, { Document, Schema, Types } from 'mongoose';
import { ISupplier } from '../interfaces/User/ISupplier';

interface ISupplierDocument extends ISupplier, Document {}

const SupplierSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    default: 'DefaultCategory',
    enum: ['Indumentaria', 'Alimentación', 'DefaultCategory']
  },
  location: {
    type: String,
    required: true,
    maxlength: 100
  },
  products: [
    {
      type: Types.ObjectId,
      ref: 'Product'
    }
  ],
  contactEmail: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  contactPhone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number']
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});

const Supplier = mongoose.model<ISupplierDocument>('Supplier', SupplierSchema);
export default Supplier;
