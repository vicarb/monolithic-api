import { ICustomer } from '../User/ICustomer';

export interface ICustomerRepository {
  createCustomer(customer: ICustomer): Promise<ICustomer>;
  getCustomerById(id: string): Promise<ICustomer | null>;
  updateCustomer(id: string, customer: ICustomer): Promise<ICustomer | null>;
  deleteCustomer(id: string): Promise<boolean>;
  // Other customer-specific methods as needed
}
