import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';  // Import the connectDB function
import supplierRoutes from './routes/supplierRoutes';  // Make sure the path is correct

dotenv.config();

// Connect to the database
connectDB();

// Create an express application instance
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Use the supplier routes
app.use('/api/suppliers', supplierRoutes);

// Basic Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
