// Model for TransactionDetails
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const transactionDetailsSchema = new Schema({
    idTransaction: {
        type: Schema.Types.ObjectId,
        ref: 'transaction',
        required: true
    },
    idProduct: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }],
}, {timestamps: true})

const TransactionDetails = mongoose.model('transactionDetails', transactionDetailsSchema);

module.exports = TransactionDetails;