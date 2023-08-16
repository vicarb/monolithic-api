import express from 'express';
import { 
    getSuppliers, 
    getSupplier, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
} from '../controllers/supplierController';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of suppliers
 *     responses:
 *       200:
 *         description: A list of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router
    .route('/')
    .get(getSuppliers)
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Created
 */
    .post(createSupplier);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A supplier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 */
router
    .route('/:id')
    .get(getSupplier)
/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Updated
 */
    .put(updateSupplier)
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
    .delete(deleteSupplier);

export default router;
