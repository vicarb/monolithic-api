import { CustomerDTO } from '../../dtos/CustomerDTO';

export interface ICustomerService {
  registerCustomer(customer: CustomerDTO): Promise<void>;
  authenticateCustomer(email: string, password: string): Promise<string>; // Returns a token or some form of user identification
}
