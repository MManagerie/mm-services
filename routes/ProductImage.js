// Route API ProductImage
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/ProductImage')

route.get('/productImage', getAllData)
route.post('/productImage/create', verifyToken, createData)
route.get('/productImage/:id', detailData)
route.put('/productImage/:id', verifyToken, updateData)
route.delete('/productImage/:id', verifyToken, deleteData)

module.exports = route