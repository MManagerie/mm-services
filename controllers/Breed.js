// Controllers for Breed
const Breed = require('../models/Breed');

module.exports = {
    getAllData: (req, res) => {
        Breed.find()
        .populate({ path:'idCategoryPet'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data Breed',
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
        Breed.create(
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
        Breed.findOne({
            '_id': id
        })
        .populate({ path:'idCategoryPet'})
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data Breed not found',
                })
            }
            res.status(200).send({
                message: 'Get all detail data Breed',
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
        Breed.findOneAndUpdate({ 
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
        Breed.deleteOne({
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
    getBreedBasedOnCategory: async (req, res) => {
        const {search} = req.query
        try {
            let breed = await Breed.find().populate({ path:'idCategoryPet'})
            let campurSari = breed.map(pet => {
                let p = {
                    id: pet._id,
                    category: pet.idCategoryPet.categoryName,
                    breedName: pet.breedName,
                };
                return p;
            });
            let firstLetterToUpperCase = search.charAt(0).toUpperCase() + search.slice(1)
            let data = campurSari.filter(item => item.category === firstLetterToUpperCase)
            res.status(200).json({
                data,
            });
        }
        catch(error){
            res.status(500).send({
                message: 'Internal server error',
                error
            })
        }
        
    },
}