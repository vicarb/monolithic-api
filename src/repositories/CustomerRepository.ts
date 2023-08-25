import { ICustomer } from '../interfaces/User/ICustomer';
import { ICustomerRepository } from '../interfaces/Repositories/ICustomerRepository';
import CustomerModel from '../models/Customer'; // Assuming you have a Customer model

export class CustomerRepository implements ICustomerRepository {
  async createCustomer(customer: ICustomer): Promise<ICustomer> {
    return await CustomerModel.create(customer);
  }

  async getCustomerById(id: string): Promise<ICustomer | null> {
    return await CustomerModel.findById(id);
  }

  async updateCustomer(id: string, customer: ICustomer): Promise<ICustomer | null> {
    return await CustomerModel.findByIdAndUpdate(id, customer, { new: true });
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const result = await CustomerModel.findByIdAndDelete(id);
    return !!result;
  }
  // Other customer-specific methods implementation
}
