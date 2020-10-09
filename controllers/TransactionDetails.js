// Controllers for TransactionDetails
const TransactionDetails = require('../models/TransactionDetails');

module.exports = {
    getAllData: (req, res) => {
        TransactionDetails.find()
        .populate({path:'idTransaction', populate: {path: 'idUser'}})
        .populate('idProduct')
        .then(result => {
            res.status(200).send({
                message: 'Get all data TransactionDetails',
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
        TransactionDetails.create(
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
        TransactionDetails.findOne({
            '_id': id
        })
        .populate('idTransaction')
        .populate('idProduct')
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data TransactionDetails not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data TransactionDetails',
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
    historyPurchase: (req, res) => {
        const {id} = req.params;
        TransactionDetails.find()
        .populate({
            path:'idTransaction',
            match: {
                idUser: id
            },
            populate: {
                path: 'idUser'
            }
        })
        .populate('idProduct')
        .then(result => {
            const filterHistory = result.filter((item) => {
                return item.idUser !== null;
            });

            res.status(200).send({
                message: 'History Purchase',
                filterHistory: filterHistory
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
        TransactionDetails.findOneAndUpdate({ 
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
        TransactionDetails.deleteOne({
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