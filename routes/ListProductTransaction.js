// Route API ListProductTransaction
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/ListProductTransaction')

route.get('/listProductTransaction', getAllData)
route.post('/listProductTransaction/create', verifyToken, createData)
route.get('/listProductTransaction/:id', detailData)
route.put('/listProductTransaction/:id', verifyToken, updateData)
route.delete('/listProductTransaction/:id', verifyToken, deleteData)

module.exports = route