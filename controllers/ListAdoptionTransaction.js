// Controllers for ListAdoptionTransaction
const ListAdoptionTransaction = require("../models/ListAdoptionTransaction");

module.exports = {
    getAllData: (req, res) => {
        ListAdoptionTransaction.find()
            .populate({
                path: "idPetUpForAdoption",
                populate: {
                    path: "idPet",
                    populate: {
                        path: "idCategoryPet",                       
                    },                     
                },
            })
            .populate({
                path: "idPetUpForAdoption",
                populate: {
                    path: "idPet",
                    populate: {
                        path: "idBreed",                       
                    },                     
                },
            })
            
            .then((result) => {
                console.log(result);
                res.status(200).send({
                    message: "Get all data ListAdoptionTransaction",
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
    getAllHistory: (req, res) => {
        const { id } = req.params;
        ListAdoptionTransaction.find()
            .populate({
                path: "idPetUpForAdoption",
                populate: {
                    path: "idPet",
                },
            })
            .populate({ 
                path:'idUser',
                match: {
                    _id: id
                }
            })
            .then((result) => {
                const filterHistory = result.filter((item) => {
                    return item.idUser !== null;
                });

                res.status(200).send({
                    message: "Get all data history adoption based by id",
                    filterReq: filterHistory,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "Error",
                    error,
                });
            });
    },
    createData: (req, res) => {
        ListAdoptionTransaction.create(req.body)
            .then((result) => {
                res.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send({
                    message: "error",
                    error,
                });
            });
    },
    detailData: (req, res) => {
        const { id } = req.params;
        ListAdoptionTransaction.findOne({
            _id: id,
        })
            .populate({ path: "idPetUpForAdoption" })
            .then((result) => {
                if(!result) {
                  res.status(200).send({
                    message: "data ListAdoptionTransaction not found"
                  });
                }
                res.status(200).send({
                    message: "Get all detail data ListAdoptionTransaction",
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
    updateData: (req, res) => {
        const { id } = req.params;
        ListAdoptionTransaction.findOneAndUpdate(
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
        ListAdoptionTransaction.deleteOne({
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
    acceptTransaction: async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await ListAdoptionTransaction.findOneAndUpdate(
                { _id: id },
                { status: "Accepted" }
            );
            if (transaction) {
                res.status(200).json({
                    message: "success accepting transaction",
                    transaction,
                });
            } else {
                res.status(400).json({
                    message: "failed to accept",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
                error,
            });
        }
    },
    declineTransaction: async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await ListAdoptionTransaction.findOneAndUpdate(
                { _id: id },
                { status: "Declined" }
            );
            if (transaction) {
                res.status(200).json({
                    message: "success accepting transaction",
                    transaction,
                });
            } else {
                res.status(400).json({
                    message: "failed to accept",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "internal server error",
                error,
            });
        }
    },
};
