import { Request, Response } from 'express';
import Supplier from '../models/Supplier';

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

        res.status(200).json({ message: "Supplier deleted", supplier: deletedSupplier });
    } catch (error) {
        res.status(500).json({ message: "Error deleting supplier", error });
    }
};
