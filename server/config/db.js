const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('debug', true);
        
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection string:', process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
        
        await mongoose.connect(process.env.MONGO_URI, {
         
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
        
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        console.error('Cause:', error.cause);
        process.exit(1);
    }
};

module.exports = connectDB;
