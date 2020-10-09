// Controllers for Transaction
const Transaction = require('../models/Transaction');

module.exports = {
    getAllData: (req, res) => {
        Transaction.find()
        .populate('idUser')
        .then(result => {
            res.status(200).send({
                message: 'Get all data Transaction',
                result
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({
                message: 'Internal server error',
                error
            })
        })
    },
    createData: (req, res) => {
        const {idUser, totalPrice} = req.body;
        Transaction.create({
            idUser: idUser,
            totalPrice: totalPrice
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
    },
    detailData: (req, res) => {
        const {id} = req.params;
        Transaction.findOne({
            '_id': id
        })
        .populate('idUser')
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data Transaction'
                })
            }
            res.status(200).send({
                message: 'Get all detail data Transaction',
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
        Transaction.findOneAndUpdate({ 
            '_id' : id
        },req.body)
        .then(result => {
            res.status(200).send({
                message: 'Success',
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
        Transaction.deleteOne({
            '_id' : id
        })
        .then(result => {
            res.status(200).send({
                message: 'Success',
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