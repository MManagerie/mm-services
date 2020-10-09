// Controllers for PetImage
const PetImage = require('../models/PetImage');
const Pet = require('../models/Pet');

module.exports = {
    getAllData: (req, res) => {
        PetImage.find()
        .populate({ path:'idPet'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data PetImage',
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
        PetImage.create(
            req.body,
        )
        .then((result) => {
            Pet.findOneAndUpdate(
                {_id: req.body.idPet},
                {$push: {image: result.urlImage}},
                {new: true}
            )
            .then((result) => {
                res.status(200).send({
                    message: 'success',
                    result
                })
            })
            .catch((error) => {
                res.status(400).send({
                    message: 'success',
                    error
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
    detailData: (req, res) => {
        const {id} = req.params;
        PetImage.findOne({
            '_id': id
        })
        .populate({ path:'idPet'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data PetImage not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data PetImage',
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
    updateData: (req,res) => {
        const {id} = req.params;
        PetImage.findOneAndUpdate({ 
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
    deleteData : (req, res) => {
        const {id} = req.params;
        PetImage.deleteOne({
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