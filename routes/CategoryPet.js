// Route API CategoryPet
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/CategoryPet')

route.get('/categoryPet', getAllData)
route.post('/categoryPet/create', verifyToken, createData)
route.get('/categoryPet/:id', detailData)
route.put('/categoryPet/:id', verifyToken, updateData)
route.delete('/categoryPet/:id', verifyToken, deleteData)

module.exports = route