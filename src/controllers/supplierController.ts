import { Request, Response } from 'express';
import Supplier from '../models/Supplier';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'; 

// Fetch all suppliers
export const getSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching suppliers", error });
    }
};

// Fetch a specific supplier
// Fetch a specific supplier along with its products
export const getSupplier = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("this id", id);
        
        const supplier = await Supplier.findById(id).populate('products'); // Populating the products field
        console.log("this is supplier", supplier);
        
        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Error fetching supplier", error });
    }
};




// Create a new supplier

export const createSupplier = async (req: Request, res: Response) => {
    try {
        const supplierData = req.body;

        // Check if a supplier with the same unique characteristics already exists
        const existingSupplier = await Supplier.findOne({ name: supplierData.name }); // Replace 'name' with your unique field
        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier with this name already exists.' }); // Adjust the error message accordingly
        }

        const newSupplier = new Supplier(supplierData);
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: "Error creating supplier", error });
    }
};

// Update a supplier's details
export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: "Error updating supplier", error });
    }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedSupplier = await Supplier.findByIdAndDelete(id);

        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        res.status(204).json({ message: "Supplier deleted", supplier: deletedSupplier });

    } catch (error) {
        res.status(500).json({ message: "Error deleting supplier", error });
    }
};

export const registerSupplier = async (req: Request, res: Response) => {
    try {
        const { name, password, contactEmail } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check for existing supplier
        const existingSupplier = await Supplier.findOne({ name });
        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier with this name already exists.' });
        }

        const newSupplier = new Supplier({
            ...req.body,
            password: hashedPassword,
        });
        await newSupplier.save();

        res.status(201).json({ message: 'Supplier registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering supplier', error });
    }
};

// Login an existing supplier
export const loginSupplier = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;

        // Find supplier
        const existingSupplier = await Supplier.findOne({ name });
        if (!existingSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, existingSupplier.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate token (replace 'your-secret-key' with a strong secret key)
        const token = jwt.sign({ id: existingSupplier._id }, 'your-secret-key');

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};