import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db'; 
import supplierRoutes from './routes/supplierRoutes'; 
import productRoutes from './routes/productRoutes'; 
import testRoute from './routes/testRoute';
import { customerRouter } from './controllers/customerController';

import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from '../swaggerConfig';

dotenv.config();

// Connect to the database
connectDB();

// Create an express application instance
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});


// Use the supplier routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api', testRoute);
app.use('/api/customer', customerRouter)


// Basic Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

export default app;
