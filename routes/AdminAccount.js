// Route API AdminAccount
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    login,
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/AdminAccount')

route.post('/adminAccount/login', login)
route.get('/adminAccount', getAllData)
route.post('/adminAccount/register', createData)
route.get('/adminAccount/:id', detailData)
route.put('/adminAccount/:id', verifyToken, updateData)
route.delete('/adminAccount/:id', verifyToken, deleteData)

module.exports = route