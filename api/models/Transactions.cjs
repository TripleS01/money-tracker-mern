const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;