const mongoose = require('mongoose');
const { mongoURI, mongoOptions } = require('../config/db_config');

async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURI, mongoOptions);
        console.log('MongoDB connection established successfully!');
    } catch (error) {
        console.error(' MongoDB connection failed:', error.message);
    }
}

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed. App is terminating.');
    process.exit(0);
});

module.exports = connectToDatabase;
