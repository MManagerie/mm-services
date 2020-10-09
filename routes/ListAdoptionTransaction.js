// Route API Breed
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    getAllHistory,
    createData,
    detailData,
    updateData,
    deleteData,
    acceptTransaction,
    declineTransaction
} = require('../controllers/ListAdoptionTransaction')

route.get('/listAdoptionTransaction', getAllData)
route.get('/listAdoptionTransaction/history/:id', getAllHistory)
route.post('/listAdoptionTransaction/create', verifyToken, createData)
route.get('/listAdoptionTransaction/:id', detailData)
route.put('/listAdoptionTransaction/:id', verifyToken, updateData)
route.delete('/listAdoptionTransaction/:id', verifyToken, deleteData)
route.put('/listAdoptionTransaction/accept/:id', verifyToken, acceptTransaction)
route.put('/listAdoptionTransaction/decline/:id', verifyToken, declineTransaction)

module.exports = route