import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { 
    getProducts, 
    getProduct,
    getProductsBySupplier,
    createProduct, 
    updateProduct, 
    deleteProduct,
    getFeaturedProducts
} from '../controllers/productController';

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const router = express.Router();

router
    .route('/')
    .get(getProducts)  // Fetch all products
    .post(upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'additionalImages', maxCount: 5 }
    ]), createProduct); // Create a new product

router
    .route('/:id')
    .get(getProduct)  // Fetch a specific product
    .put(upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'additionalImages', maxCount: 5 }
    ]), updateProduct) // Update a specific product
    .delete(deleteProduct); // Delete a specific product

router
    .route('/supplier/:supplierId')
    .get(getProductsBySupplier); // Fetch all products for a specific supplier


  router
    .route('/filtered/featured')
    .get(getFeaturedProducts);    
export default router;
