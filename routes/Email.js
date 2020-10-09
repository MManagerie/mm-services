// Route API Email
const express = require('express')
const route = express.Router();

const {
    verificationEmail,
    verificationAccount
} = require('../controllers/Email')

route.post('/verification/get-activation-email', verificationEmail)
route.get('/verification/verify-account/:id/:secretCode', verificationAccount)

module.exports = route