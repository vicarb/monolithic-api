import express from 'express';
import { 
    getProducts, 
    getProduct,
    getProductsBySupplier,
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController';

const router = express.Router();

router
    .route('/')
    .get(getProducts)  // Fetch all products
    .post(createProduct); // Create a new product

router
    .route('/:id')
    .get(getProduct)  // Fetch a specific product
    .put(updateProduct) // Update a specific product
    .delete(deleteProduct); // Delete a specific product

router
    .route('/supplier/:supplierId')
    .get(getProductsBySupplier); // Fetch all products for a specific supplier

export default router;
