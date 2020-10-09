// Controllers for ListProductTransaction
const ListProductTransaction = require('../models/ListProductTransaction');

module.exports = {
    getAllData: (req, res) => {
        ListProductTransaction.find()
        .populate({ path:'idTransaction'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data ListProductTransaction',
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
        ListProductTransaction.create(
            req.body,
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
        ListProductTransaction.findOne({
            '_id': id
        })
        .populate({ path:'idTransaction'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data ListProductTransaction not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data ListProductTransaction',
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
        ListProductTransaction.findOneAndUpdate({ 
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
        ListProductTransaction.deleteOne({
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