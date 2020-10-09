// Route API FormRequest
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    detailFormPetData,
    allReqData,
    allApproveData,
    allRejectData,
    allCompleteData,
    updateData,
    approveData,
    rejectData,
    completeData,
    deleteData
} = require('../controllers/FormRequest')

route.get('/formRequest', getAllData)
route.post('/formRequest/create', createData)
route.get('/formRequest/:id', detailData)
route.get('/formRequest/pet/:id', detailFormPetData)
route.get('/formRequest/all/:id', allReqData)
route.get('/formRequest/approve/:id', allApproveData)
route.get('/formRequest/reject/:id', allRejectData)
route.get('/formRequest/complete/:id', allCompleteData)
route.put('/formRequest/:id', verifyToken, updateData)
route.put('/formRequest/approve/:id', verifyToken, approveData)
route.put('/formRequest/reject/:id', verifyToken, rejectData)
route.put('/formRequest/complete/:id', verifyToken, completeData)
route.delete('/formRequest/:id', verifyToken, deleteData)

module.exports = route