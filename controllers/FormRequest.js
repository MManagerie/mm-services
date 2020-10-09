// Controllers for FormRequest
const FormRequest = require('../models/FormRequest');

module.exports = {
    getAllData: (req, res) => {
        FormRequest.find()
        .populate({ path:'idUser'})
        .populate({ 
            path:'idPet',
            populate: [{
                path: 'idBreed'
            }, {
                path: 'idUser'
            }]
        })
        .then(result => {
            res.status(200).send({
                message: 'Get all data FormRequest',
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
    createData: async (req, res) => {
        try {
            let form = FormRequest.create(
                req.body,
            )
            if(form){
                res.status(200).json({
                    message: 'success',
                    form
                })
            } else {
                console.log('error')
                res.status(400).json({
                    message: 'failed'
                })
            }

        }catch(error){
            console.log(error)
            res.status(500).json({
                message: "internal server error",
                error
            })
        }
    },
    detailData: (req, res) => {
        const {id} = req.params;
        FormRequest.findOne({
            '_id': id
        })
        .populate({ path:'idUser'})
        .populate({ path:'idPet'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data FormRequest not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data FormRequest',
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
    detailFormPetData: (req, res) => {
        const {id} = req.params;
        FormRequest.findOne({
            idPet : id
        })
        .populate({ path:'idUser'})
        .populate({ path:'idPet'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data FormRequest not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data FormRequest',
                result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: 'Error',
                error
            })
        })
    },
    allReqData: (req, res) => {
        const {id} = req.params;
        FormRequest.find()
        .populate({ 
            path:'idUser',
            match: {
                _id: id
            }
        })
        .populate({ 
            path:'idPet',
            populate: {
                path: 'idBreed',
                populate: {
                    path: 'idCategoryPet'
                },
            },
        })
        .populate({
            path: 'idPet',
            populate: {
                path: 'idUser'
            }
        })
        .then(result => {
            const filterReq = result.filter((item) => {
                return item.idUser !== null;
            });


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
    allApproveData: (req, res) => {
        const {id} = req.params;
        FormRequest.find({
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
        FormRequest.find({
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
        FormRequest.find({
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
        console.log(req.body);
        FormRequest.findOneAndUpdate({ 
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
        FormRequest.findOneAndUpdate({ 
            '_id' : id
        }, {
            status: 'Approved'
        })
        .then(result => {
            res.status(200).send({
                message: 'Approved',
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
        FormRequest.findOneAndUpdate({ 
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
        FormRequest.findOneAndUpdate({ 
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
        FormRequest.deleteOne({
            '_id' : id
        })
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
    }
}