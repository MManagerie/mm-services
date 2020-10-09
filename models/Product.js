// Model for Product
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        type: String
    },
    categories: {
        type: String
    },
    price: {
        type: String
    },
    stock: {
        type: String
    },
    image: [{
        type: Object
    }]
}, {timestamps: true})

const Product = mongoose.model('product', productSchema);

module.exports = Product;