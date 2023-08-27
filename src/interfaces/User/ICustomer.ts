// src/interfaces/User/ICustomer.ts
import { IUser } from './IUser';


export interface ICustomer extends IUser {
  id?: string;
  dateOfBirth?: Date;
  // Additional customer-specific properties can go here, such as loyalty points, etc.
}
