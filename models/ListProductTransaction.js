// Model for ListProductTransaction
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const listProductTransactionSchema = new Schema({
    idTransaction: {
        type: Schema.Types.ObjectId,
        ref: 'transaction',
        required: true
    },
    transactionDate: {
        type: String
    },
    fullName: {
        type: String
    },
    totalPrice: {
        type: String
    },
    urlImagePaymentVerification: {
        type: String
    }
}, {timestamps: true})

const ListProductTransaction = mongoose.model('listProductTransaction', listProductTransactionSchema);

module.exports = ListProductTransaction;