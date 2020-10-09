// Route API Product
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData,
    sortProductPriceLowToHigh,
    sortProductPriceHighToLow,
    productFilter
} = require('../controllers/Product')

route.get('/product', getAllData)
route.get('/sortProductLowToHigh', sortProductPriceLowToHigh)
route.get('/sortProductHighToLow', sortProductPriceHighToLow)
route.get('/product/filter', productFilter)
route.post('/product/create', verifyToken, createData)
route.get('/product/:id', detailData)
route.put('/product/:id', verifyToken, updateData)
route.delete('/product/:id', verifyToken, deleteData)

module.exports = route