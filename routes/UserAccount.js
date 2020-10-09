// Route API UserAccount
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    login,
    getAllData,
    createData,
    detailData,
    updateDataEmail,
    updateDataPassword,
    deleteData
} = require('../controllers/UserAccount')

route.post('/userAccount/login', login)
route.get('/userAccount', getAllData)
route.post('/userAccount/register', createData)
route.get('/userAccount/:id', detailData)
route.put('/userAccountEmail/:id', updateDataEmail)
route.put('/userAccountPassword/:id', updateDataPassword)
route.delete('/userAccount/:id', verifyToken, deleteData)

module.exports = route