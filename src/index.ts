import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';  // Import the connectDB function
import supplierRoutes from './routes/supplierRoutes'; // Make sure the path is correct
import productRoutes from './routes/productRoutes'; 
import cors from 'cors';
dotenv.config();

// Connect to the database
connectDB();

// Create an express application instance
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});


// Use the supplier routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);

// Basic Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
