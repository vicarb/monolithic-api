// IUserRepository.ts

import { IUser } from '../User/IUser';
import { ICustomer } from '../User/ICustomer';
import { ISupplier } from '../User/ISupplier';

export interface IUserRepository {
  createCustomer(customer: ICustomer): Promise<void>;
  createSupplier(supplier: ISupplier): Promise<void>;
  findCustomerByEmail(email: string): Promise<ICustomer | null>;
  findSupplierByEmail(email: string): Promise<ISupplier | null>;
}
