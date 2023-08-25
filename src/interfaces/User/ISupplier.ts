// src/interfaces/User/ISupplier.ts

import { IUser } from './IUser';

export interface ISupplier extends IUser {
  companyName: string;
  location: string; // Location of the company
  industry: string; // Industry the company operates in
  // Additional company-specific properties can go here, such as VAT number, address, etc.
}
