import { ICustomerService } from '../interfaces/Services/ICustomerService';
import { CustomerDTO } from '../dtos/CustomerDTO';
import { CustomerRepository } from '../repositories/CustomerRepository';

import CustomerModel from '../models/Customer';
import bcrypt from 'bcrypt';  // npm install bcrypt
import jwt from 'jsonwebtoken';  // npm install jsonwebtoken

export class CustomerService implements ICustomerService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async registerCustomer(customer: CustomerDTO): Promise<void> {
    // Data validation, email uniqueness check, etc.

    // Hash the customer's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(customer.password, saltRounds);

    // Create a new Customer entity with the hashed password
    const customerEntity = new CustomerModel({
      ...customer,
      password: hashedPassword
    });

    // Save the customer entity
    await this.customerRepository.createCustomer(customerEntity);
  }

  async authenticateCustomer(email: string, password: string): Promise<string> {
    // Fetch the customer by email
    const customer = await this.customerRepository.getCustomerByEmail(email);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate a token (you can include any payload you want here)
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      'your-secret-key',  // This should be in your env variables
      { expiresIn: '1h' }
    );

    return token;
  }
}
