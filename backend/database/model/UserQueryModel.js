const mongoose = require('mongoose');

const userQuerySchema = new mongoose.Schema(
    {
        full_name : { type: String, required: true },
        contact : { type: String, required: true },
        subject : { type: String, required: true },
        message : { type: String, required: true },
    },
    { timestamps: true }
);

const Item = mongoose.model('user-query', userQuerySchema);

module.exports = Item;
