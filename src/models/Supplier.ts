// src/models/Supplier.ts

import { ISupplier } from '../interfaces/User/ISupplier';
import mongoose, { Document, Schema } from 'mongoose';

interface ISupplierDocument extends ISupplier, Document { }

const SupplierSchema: Schema = new Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  location: {
    type: String,
    required: true,
    maxlength: 100
  },
  industry: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  // You may include other fields such as contactEmail, contactPhone, and products as needed.
});

const Supplier = mongoose.model<ISupplierDocument>('Supplier', SupplierSchema);
export default Supplier;
