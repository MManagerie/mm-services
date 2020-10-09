// Route API PetUpForAdoption
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    allPetUpData,
    allApproveData,
    allRejectData,
    allCompleteData,
    updateData,
    approveData,
    rejectData,
    completeData,
    deleteData,
    getPetUpForAdoptionFromIdPet
} = require('../controllers/PetUpForAdoption')

route.get('/petUpForAdoption', getAllData)
route.post('/petUpForAdoption/create', verifyToken, createData)
route.get('/petUpForAdoption/:id', detailData)
route.get('/petUpForAdoption/all/:id', allPetUpData)
route.get('/petUpForAdoption/approve/:id', allApproveData)
route.get('/petUpForAdoption/reject/:id', allRejectData)
route.get('/petUpForAdoption/complete/:id', allCompleteData)
route.put('/petUpForAdoption/:id', verifyToken, updateData)
route.put('/petUpForAdoption/approve/:id', approveData)
route.put('/petUpForAdoption/reject/:id', verifyToken, rejectData)
route.put('/petUpForAdoption/complete/:id', verifyToken, completeData)
route.delete('/petUpForAdoption/:id', verifyToken, deleteData)
route.get('/petUpForAdoption/pet/:id', getPetUpForAdoptionFromIdPet)

module.exports = route