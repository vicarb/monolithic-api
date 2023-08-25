// UserRepository.ts

import { IUserRepository } from '../interfaces/Repositories/IUserRepository';
import { ICustomer } from '../interfaces/User/ICustomer';
import { ISupplier } from '../interfaces/User/ISupplier';

export class UserRepository implements IUserRepository {
  createCustomer(customer: ICustomer): Promise<void> {
    // Implementation for creating a customer in the database
  }

  createSupplier(supplier: ISupplier): Promise<void> {
    // Implementation for creating a supplier in the database
  }

  findCustomerByEmail(email: string): Promise<ICustomer | null> {
    // Implementation for finding a customer by email in the database
  }

  findSupplierByEmail(email: string): Promise<ISupplier | null> {
    // Implementation for finding a supplier by email in the database
  }
}
