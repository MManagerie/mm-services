// Route API PetCollection
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData,
    searchCollection
} = require('../controllers/PetCollection')

route.get('/petCollection', getAllData)
route.post('/petCollection/create', verifyToken, createData)
route.get('/petCollection/:id', detailData)
route.get('/petCollection/collection/:collection', searchCollection)
route.put('/petCollection/:id', verifyToken, updateData)
route.delete('/petCollection/:id', verifyToken, deleteData)

module.exports = route