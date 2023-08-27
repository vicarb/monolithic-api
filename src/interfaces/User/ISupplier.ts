// src/interfaces/User/ISupplier.ts
import { IUser } from './IUser';
import { Types } from 'mongoose';

export interface ISupplier extends IUser {
  name: string;
  description?: string;
  category: string;
  location: string;
  products: Types.ObjectId[];
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  industry: string;
}
