// Controllers for Breed
const ProductImage = require('../models/ProductImage');
const Product = require('../models/Product');

module.exports = {
    getAllData: (req, res) => {
        ProductImage.find()
        .populate({path: 'idProduct', select: 'price productName stock'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data ProductImage',
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
    createData: async (req, res) => {
        try {
            const data = await ProductImage.create({
                ...req.body
            })
            const product = await Product.findOneAndUpdate(
                {_id: req.body.idProduct},
                {$push: {image:{
                    id: data._id,
                    image: data.urlImage
                }}},
                {new: true}
            )
            res.status(200).send({
                message: 'success',
                product
            })
        } catch(error){
            console.log(error);
            res.status(500).json({
                message: 'internal server error'
            })
        }
    },
    detailData: (req, res) => {
        const {id} = req.params;
        ProductImage.findOne({
            '_id': id
        })
        .populate({ path:'idProduct'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data ProductImage not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data ProductImage',
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
        ProductImage.findOneAndUpdate({ 
            '_id' : id
        },req,body)
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
    deleteData : async (req, res) => {
        const {id} = await req.params;
        const productImage = await ProductImage.findByIdAndDelete({_id: id})
        console.log(productImage);
        ProductImage.deleteOne({
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