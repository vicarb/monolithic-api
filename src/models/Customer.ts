import mongoose, { Document } from 'mongoose';
import { ICustomer } from '../interfaces/User/ICustomer';

type ICustomerDocument = ICustomer & Document;

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // other customer-specific fields
});

const CustomerModel = mongoose.model<ICustomerDocument>('Customer', customerSchema);

export default CustomerModel;
