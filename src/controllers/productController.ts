import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import Supplier from '../models/Supplier';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const storage = new Storage();
const bucket = storage.bucket('b2b-bucket-v2');


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

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    next();
  };
  
// Create a new product
export const createProduct = [
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Incoming request files:', req.files);
    console.log('Incoming request body:', req.body);

    if (!req.files) {
      return next();
    }

    const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files);
    const flattenedFiles = filesArray.flat();
    console.log('Flattened files array:', flattenedFiles);

    const promises = flattenedFiles.map((file: any) => {
      console.log('Processing file:', file.originalname);
      const extension = path.extname(file.originalname);
      const filename = uuidv4() + extension;
      console.log('Generated filename:', filename);
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      return new Promise<string>((resolve, reject) => {
        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl);
        });
        blobStream.on('error', (err) => {
          console.error('Error during blob streaming:', err);
          reject(err);
        });
        blobStream.end(file.buffer);
      });
    });

    Promise.all(promises)
      .then((fileNames) => {
        console.log('All files processed:', fileNames);
        req.body.images = fileNames;
        next();
      })
      .catch((err) => {
        console.error('Error during Promise.all execution:', err);
        next(err);
      });
  },
  async (req: Request, res: Response) => {
    try {
      const images = req.body.images || [];
      const productData = req.body;
      const mainImage = images[0];
      const additionalImages = images.slice(1);

      console.log('Product data:', productData);

      const existingProduct = await Product.findOne({ name: productData.name });
      if (existingProduct) {
        console.log('Product with this name already exists:', existingProduct);
        return res.status(400).json({ message: 'Product with this name already exists.' });
      }

      const newProduct = new Product({
        ...productData,
        mainImage,
        additionalImages,
      });

      console.log('New product:', newProduct);

      await newProduct.save();

      const supplier = await Supplier.findById(productData.supplier);
      if (supplier) {
        supplier.products.push(newProduct._id);
        await supplier.save();
      }

      console.log('Product created successfully:', newProduct);

      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error in creating product:', error);
      res.status(500).json({ message: "Error creating product", error });
    }
  }
];

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

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
      console.log("this is req--->", req);
      
      const products = await Product.find({ featured: true });
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ message: "Error fetching featured products", error });
  }
};