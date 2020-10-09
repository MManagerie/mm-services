// Controllers for PetUpForAdoption
const PetUpForAdoption = require('../models/PetUpForAdoption');
const Pet = require('../models/Pet');
const PetImage = require('../models/PetImage');

module.exports = {
    getAllData: (req, res) => {
        PetUpForAdoption.find()
        .populate({ path:'idUser'})
        .populate({ 
            path:'idPet',
            populate: [{
                path: 'idBreed',
            }, {
                path: 'idCategoryPet'
            }, {
                path: 'idUser'
            }]
        })
        .populate({ path:'idRequest'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data PetUpForAdoption',
                result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: 'Internal server error',
                error
            })
        })
    },
    createData: (req, res) => {
        PetUpForAdoption.create(
            req.body
        )
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        PetUpForAdoption.findOne({
            '_id': id
        })
        .populate({ path:'idUser'})
        .populate({ path:'idPet'})
        .populate({ path:'idRequest'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data PetUpForAdoption not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data PetUpForAdoption',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    allPetUpData: (req, res) => {
        const {id} = req.params;
        PetUpForAdoption.find()
        .populate({ 
            path:'idUser',
            match: {
                _id: id
            }
        })
        .populate({ 
            path:'idPet',
            populate: {
                path: 'idBreed'
            }
        })
        .populate({ path:'idRequest'})
        .then(result => {
            const filterPetUp = result.filter((item) => {
                return item.idUser !== null;
            });


            res.status(200).send({
                message: 'Get all data based by id',
                filterPetUp: filterPetUp
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    allApproveData: (req, res) => {
        const {id} = req.params;
        PetUpForAdoption.find({
            status: 'Approved'
        })
        .populate({ 
            path:'idUser',
            match: {
                _id: id
            }
        })
        .populate({ 
            path:'idPet',
            populate: {
                path: 'idBreed'
            }
        })
        .populate({ path:'idRequest'})
        .then(result => {
            const filterReq = result.filter((item) => {
                return item.idUser !== null;
            });
            console.log(filterReq)


            res.status(200).send({
                message: 'Get all data based by id',
                filterReq: filterReq
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    allRejectData: (req, res) => {
        const {id} = req.params;
        PetUpForAdoption.find({
            status: 'Rejected'
        })
        .populate({ 
            path:'idUser',
            match: {
                _id: id
            }
        })
        .populate({ 
            path:'idPet',
            populate: {
                path: 'idBreed'
            }
        })
        .populate({ path:'idRequest'})
        .then(result => {
            const filterReq = result.filter((item) => {
                return item.idUser !== null;
            });
            console.log(filterReq)


            res.status(200).send({
                message: 'Get all data based by id',
                filterReq: filterReq
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    allCompleteData: (req, res) => {
        const {id} = req.params;
        PetUpForAdoption.find({
            status: 'Completed'
        })
        .populate({ 
            path:'idUser',
            match: {
                _id: id
            }
        })
        .populate({ 
            path:'idPet',
            populate: {
                path: 'idBreed'
            }
        })
        .populate({ path:'idRequest'})
        .then(result => {
            const filterReq = result.filter((item) => {
                return item.idUser !== null;
            });
            console.log(filterReq)


            res.status(200).send({
                message: 'Get all data based by id',
                filterReq: filterReq
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    updateData: (req,res) => {
        const {id} = req.params;
        PetUpForAdoption.findOneAndUpdate({ 
            '_id' : id
        },req.body)
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    approveData: (req,res) => {
        const {id} = req.params;
        PetUpForAdoption.findOneAndUpdate({ 
            '_id' : id
        }, {
            status: 'Completed'
        })
        .then(result => {
            res.status(200).send({
                message: 'Competed',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    rejectData: (req,res) => {
        const {id} = req.params;
        PetUpForAdoption.findOneAndUpdate({ 
            '_id' : id
        }, {
            status: 'Rejected'
        })
        .then(result => {
            res.status(200).send({
                message: 'Rejected',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    completeData: (req,res) => {
        const {id} = req.params;
        PetUpForAdoption.findOneAndUpdate({ 
            '_id' : id
        }, {
            status: 'Completed'
        })
        .then(result => {
            res.status(200).send({
                message: 'Completed',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    deleteData : (req, res) => {
        const {id} = req.params;
        PetUpForAdoption.findOne({
            _id: id
        })
        .then((result) => {
            if(!result) {
                res.status(404).send({
                    message: 'data not found'
                })
            }
            Pet.findOne({
                _id: result.idPet
            })
            .then((result) => {
                PetImage.deleteOne({
                    idPet: result._id 
                })
                .then(() => {
                    Pet.deleteOne({
                        _id: result._id 
                    })
                    .then(() => {
                        PetUpForAdoption.deleteOne({
                            '_id' : id
                        })
                        .then(result => {
                            res.status(200).send({
                                message: 'success',
                                result
                            })
                        })
                    })
                })
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    getPetUpForAdoptionFromIdPet : async (req, res) => {
        const {id} = req.params
        let result = await PetUpForAdoption.find()
        .populate({
            path: 'idPet',
            match: {
                _id: id
            }
        })
        .populate({
            path: 'idPet',
            populate : {
                path: 'idUser'
            }
        })
        if(result){
            res.status(200).json({
                result: result
            })
        }
    }
}