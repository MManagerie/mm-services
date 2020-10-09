// Route API Users
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    detailData,
    updateData
} = require('../controllers/Users')

route.get('/users/:id', detailData)
route.put('/users/:id', updateData)

module.exports = route