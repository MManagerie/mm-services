// Controllers for PetCollection
const PetCollection = require("../models/PetCollection");
const Pet = require("../models/Pet");
const { collection } = require("../config/db");

module.exports = {
    getAllData: (req, res) => {
        PetCollection.find()
            .populate({
                path: "idPet",
                populate: {
                    path: "idCategoryPet",
                },
            })
            .then((result) => {
                res.status(200).send({
                    message: "Get all data PetCollection",
                    result,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Internal server error",
                    error,
                });
            });
    },
    createData: async (req, res) => {
        const { collectionName, idPet } = req.body;
        console.log(req.body)
       try {
        let petCollection = await PetCollection.create({collectionName,idPet });
        let pet = await Pet.findOneAndUpdate(
            {_id: idPet },
            {$push: {idCollections: petCollection._id}},
            {new: true}
        )
        if(pet){
            res.status(200).send({
                message: 'success',
            })
        } else {
            res.status(400).send({})
        }
       }
       catch(error){
        res.status(500).send({
            message: "internal server error"
        })
       }
    },
    detailData: (req, res) => {
        const { id } = req.params;
        PetCollection.findOne({
            _id: id,
        })
            .populate({
                path: "idPet",
                populate: {
                    path: "idCategoryPet",
                },
            })
            .then((result) => {
                if(!result) {
                    res.status(404).send({
                        message: "detail data PetCollection not found"
                    });
                }
                res.status(200).send({
                    message: "Get all detail data PetCollection",
                    result,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "Error",
                    error,
                });
            });
    },
    searchCollection: (req, res) => {
        const { collection } = req.params;
        PetCollection.find({
            collectionName: collection,
        })
            .populate({
                path: "idPet",
                populate: {
                    path: "idCategoryPet",
                },
            })
            .then((result) => {
                res.status(200).send({
                    message: "Get all data collectionName",
                    result,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send({
                    message: "Error",
                    error,
                });
            });
    },
    updateData: (req, res) => {
        const { id } = req.params;
        PetCollection.findOneAndUpdate(
            {
                _id: id,
            },
            req.body
        )
            .then((result) => {
                res.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "error",
                    error,
                });
            });
    },
    deleteData: (req, res) => {
        const { id } = req.params;
        PetCollection.deleteOne({
            _id: id,
        })
            .then((result) => {
                res.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "error",
                    error,
                });
            });
    },
};
