// Route API TransactionDetails
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    historyPurchase,
    updateData,
    deleteData
} = require('../controllers/TransactionDetails')

route.get('/transactionDetails', getAllData)
route.post('/transactionDetails/create', verifyToken, createData)
route.get('/transactionDetails/:id', detailData)
route.get('/transactionDetails/history/:id', historyPurchase)
route.put('/transactionDetails/:id', verifyToken, updateData)
route.delete('/transactionDetails/:id', verifyToken, deleteData)

module.exports = route