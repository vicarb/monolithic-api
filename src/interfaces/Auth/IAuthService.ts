// IAuthenticationService.ts

import { IUser } from '../User/IUser';
import { ICustomer } from '../User/ICustomer';
import { ISupplier } from '../User/ISupplier';

export interface IAuthenticationService {
  signUpCustomer(customerData: ICustomer): Promise<void>;
  signUpSupplier(supplierData: ISupplier): Promise<void>;
  loginCustomer(email: string, password: string): Promise<ICustomer>;
  loginSupplier(email: string, password: string): Promise<ISupplier>;
}
