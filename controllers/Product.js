// Controllers for Product
const Product = require('../models/Product');

module.exports = {
    getAllData: (req, res) => {
        Product.find().populate({path: 'productImage', select: 'urlImage'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data Product',
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
        Product.create(
            req.body
        )
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        Product.findOne({
            '_id': id
        })
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data Product not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data Product',
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
        Product.findOneAndUpdate({ 
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
        Product.deleteOne({
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
    },
    sortProductPriceLowToHigh: async (req, res) => {
        const { filter } = req.query;
        let pr = await Product.find({}).populate({path: 'productImage', select: 'urlImage'})
            let resultmap = pr.map(item => {
                let t = {
                    image: item.image,
                    _id: item._id,
                    productName: item.productName,
                    categories: item.categories,
                    price : parseInt(item.price),
                    stock: parseInt(item.stock),
                }
                return t
            })
            let sorted = resultmap.sort((a,b) => a.price - b.price)
            let data = sorted.filter(
                (item) => item.categories === filter 
            );
            res.status(200).send({
                message: 'Get all data Product',
                sorted : data.length == 0 ? sorted : data
            })
        },
    sortProductPriceHighToLow: async (req, res) => {
        const { filter } = req.query;
        let pr = await Product.find({}).populate({path: 'productImage', select: 'urlImage'})
            let resultmap = pr.map(item => {
                let t = {
                    image: item.image,
                    _id: item._id,
                    productName: item.productName,
                    categories: item.categories,
                    price : parseInt(item.price),
                    stock: parseInt(item.stock),
                }
                return t
            })
            let sorted = resultmap.sort((a,b) => b.price - a.price)
            let data = sorted.filter(
                (item) => item.categories === filter 
            );
            console.log(data.length);
            res.status(200).send({
                message: 'Get all data Product',
                sorted : data.length == 0 ? sorted : data
            })
    },
    productFilter: async (req, res) => {
        const { search } = req.query;
        let pr = await Product.find({}).populate({path: 'productImage', select: 'urlImage'})
            let resultmap = pr.map(item => {
                let t = {
                    image: item.image,
                    _id: item._id,
                    productName: item.productName,
                    categories: item.categories,
                    price : parseInt(item.price),
                    stock: parseInt(item.stock),
                }
                return t
            })
            let data = resultmap.filter(
                (item) => item.categories === search 
            );
            res.status(200).send({
                message: 'Get all data Product',
                result : data
            })
    }
}