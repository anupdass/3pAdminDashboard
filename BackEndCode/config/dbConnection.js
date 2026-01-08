require('dotenv').config();
const mongoose = require('mongoose');

if (!process.env.DB_URL) {
    console.error('❌ Missing required environment variable: DB_URL');
    process.exit(1);
}


const dbUrl = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ Initial MongoDB connection failed:', err.message);
        if (err.cause) console.error('📌 Cause:', err.cause);
        process.exit(1);
    }
};

module.exports = connectDB;
