require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGODB_URI,
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
