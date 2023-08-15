import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async (): Promise<void> => {
    // Event listeners for various MongoDB events
    mongoose.connection.on('connecting', () => {
        console.log('Connecting to MongoDB...');
    });

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected!');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected!');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected!');
    });

    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err.message);
    });

    try {
        console.log(process.env.MONGODB_URI);
        
        const conn = await mongoose.connect(process.env.MONGODB_URI!, {});


        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        const err = error as Error;
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
