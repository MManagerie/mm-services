// Model for Transaction
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    totalPrice: {
        type: Number
    }
}, {timestamps: true})

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;