// src/interfaces/User/ISupplier.ts
import { IUser } from './IUser';

export interface ISupplier extends IUser {
  companyName: string; // Company Name
  location: string;    // Location of the company
  industry: string;    // Industry the company operates in
}
