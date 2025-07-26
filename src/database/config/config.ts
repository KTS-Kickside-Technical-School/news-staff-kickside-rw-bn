import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = 
    process.env.NODE_ENV === 'production'
        ? process.env.MONGO_PROD_DB
        : process.env.NODE_ENV === 'test'
            ? process.env.MONGO_TEST_DB
            : process.env.MONGO_DEV_DB;
            

export const connect = async (): Promise<void> => {
    try {
        if (!uri) {
            throw new Error('Database URI is not defined!');
        }
        await mongoose.connect(uri);

        console.log('Database connected successfully!');
    } catch (error) {
        console.error(`Database connection error: ${error}`);
        process.exit(1);
    }
};
