import express, { Request, Response, NextFunction } from 'express';

// Create an express application instance
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, TypeScript with Express!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
