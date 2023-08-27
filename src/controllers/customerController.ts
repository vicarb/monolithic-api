import express, { Request, Response } from 'express';
import { CustomerService } from '../services/CustomerService';
import { CustomerRepository } from '../repositories/CustomerRepository';  // Make sure to import this

// Initialize the repository and pass it to the service
const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    await customerService.registerCustomer(req.body);
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (err) {
    if (err instanceof Error) {  // Add type checking here
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const token = await customerService.authenticateCustomer(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (err) {
    if (err instanceof Error) {  // Add type checking here
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

export { router as customerRouter };
