// Route API PetImage
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/PetImage')

route.get('/petImage', getAllData)
route.post('/petImage/create', verifyToken, createData)
route.get('/petImage/:id', detailData)
route.put('/petImage/:id', verifyToken, updateData)
route.delete('/petImage/:id', verifyToken, deleteData)

module.exports = route