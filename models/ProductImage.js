// Model for ProductImage
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productImageSchema = new Schema({
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    urlImage: {
        type: String
    }
}, {timestamps: true})

const ProductImage = mongoose.model('productImage', productImageSchema);

module.exports = ProductImage;