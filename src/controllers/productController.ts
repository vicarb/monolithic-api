import { Request, Response } from 'express';
import Product from '../models/Product';
import Supplier from '../models/Supplier';

// Fetch all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Fetch a specific product
export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Fetch all products for a specific supplier
export const getProductsBySupplier = async (req: Request, res: Response) => {
    try {
        const { supplierId } = req.params;
        const products = await Product.find({ supplier: supplierId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products for supplier", error });
    }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        await newProduct.save();

        // Find the supplier and add the product to the products array
        const supplier = await Supplier.findById(productData.supplier);
        if (supplier) {
            supplier.products.push(newProduct._id);
            await supplier.save();
        }

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Update a product's details
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
