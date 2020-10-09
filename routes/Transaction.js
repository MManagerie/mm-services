// Route API Transaction
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/Transaction')

route.get('/transaction', getAllData)
route.post('/transaction/create', verifyToken, createData)
route.get('/transaction/:id', detailData)
route.put('/transaction/:id', verifyToken, updateData)
route.delete('/transaction/:id', verifyToken, deleteData)

module.exports = route