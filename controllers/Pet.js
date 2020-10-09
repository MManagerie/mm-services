// Controllers for Pet
const Pet = require("../models/Pet");
const UserAccount = require("../models/UserAccount");
const PetUpForAdoption = require("../models/PetUpForAdoption");

module.exports = {
    createData: (req, res) => {
        Pet.create(req.body)
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
    getAllData: (req, res) => {
        Pet.find()
            .populate({ path: "idCategoryPet" })
            .populate({ path: "idCollections" })
            .populate({ path: "idBreed" })
            .then((result) => {
                res.status(200).send({
                    message: "Get all data Pet",
                    result,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    message: "Internal server error",
                    error,
                });
            });
    },
    detailData: async (req, res) => {
        const { id } = req.params;
        const pet = await Pet.findOne({
            _id: id,
        })
            .populate({ path: "idCategoryPet" })
            .populate({ path: "idCollections" })
            .populate({ path: "idBreed" })
            .populate({ path: "idUser" });

        const userAccount = await UserAccount.findOne({
            idUser: pet.idUser._id,
        });

        let result = {
            ...pet._doc,
            idUser: { ...pet.idUser._doc, email: userAccount.email },
        };

        res.status(200).send({
            message: "Get all detail data Pet",
            result,
        });
    },
    updateData: (req, res) => {
        const { id } = req.params;
        Pet.findOneAndUpdate(
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
    findByGender: async (req, res) => {
        try {
            const result = await Pet.find({
                gender: {
                    $regex: req.query.gender,
                },
            })
                .populate("idCategoryPet")
                .populate({ path: "idCollections" });

            if (result) {
                res.status(200).json({
                    data: result,
                });
            } else {
                res.status(400).json({
                    data: "not found",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    findByLocation: async (req, res) => {
        try {
            const result = await Pet.find({
                location: {
                    $regex: req.query.location,
                    $options: "i",
                },
            })
                .populate("idCategoryPet")
                .populate({ path: "idCollections" });
            if (result) {
                res.status(200).json({
                    data: result,
                });
            } else {
                res.status(400).json({
                    data: "not found",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    findDetailPets: async (req, res) => {
        const { search, category } = req.query;
        try {
            let result = await PetUpForAdoption.find()
            .populate({ path:'idUser'})
            .populate({ 
                path:'idPet',
                populate: [{
                    path: 'idBreed',
                }, {
                    path: 'idCategoryPet'
                }, {
                    path: 'idUser'
                }]
            })
            .populate({ path:'idRequest'});

            let firstLetterToUpperCase =
                search.charAt(0).toUpperCase() + search.slice(1);
            let data = result.filter(
                (item) =>
                    item.idPet.petName === firstLetterToUpperCase ||
                    item.idPet.idCategoryPet.categoryName === firstLetterToUpperCase ||
                    item.idPet.idBreed.breedName === firstLetterToUpperCase ||
                    item.idPet.location === firstLetterToUpperCase
            );

            console.log(data);
            res.status(200).json({
                result: data,
            });
        } catch (error) {
            console.log(error);
        }
    },
    findDetailPet: async (req, res) => {
        const { search, category } = req.query;
        try {
            let result = await Pet.find({})
                .populate("idCollections")
                .populate("idCategoryPet")
                .populate("idBreed")
                .populate("idUser");
            let detailPet = await result.map((item) => {
                console.log(result);

                if (
                    item.idCollections === null ||
                    item.idCollections === undefined
                ) {
                    var pet = {
                        id: item._id,
                        category: item.idCategoryPet.categoryName,
                        breed: item.idBreed.breedName,
                        collectionName: "",
                        petName: item.petName,
                        gender: item.gender,
                        age: item.age,
                        weight: item.weight,
                        size: item.size,
                        location: item.location,
                        about: item.about,
                        image: item.image,
                    };
                    return pet;
                } else {
                    var pet = {
                        id: item._id,
                        category: item.idCategoryPet.categoryName,
                        breed: item.idBreed.breedName,
                        collectionName: item.idCollections.collectionName,
                        petName: item.petName,
                        gender: item.gender,
                        age: item.age,
                        weight: item.weight,
                        size: item.size,
                        location: item.location,
                        about: item.about,
                        image: item.image,
                    };
                    return pet;
                }
            });

            let firstLetterToUpperCase =
                search.charAt(0).toUpperCase() + search.slice(1);
            let data = detailPet.filter(
                (item) =>
                    item.category === firstLetterToUpperCase ||
                    item.breed === firstLetterToUpperCase ||
                    item.location === firstLetterToUpperCase ||
                    item.collectionName === firstLetterToUpperCase
            );
            res.status(200).json({
                data,
            });
        } catch (error) {
            console.log(error);
        }
    },
    searchPetCollection: async (req, res) => {
        const { search } = req.query;
        try {
            const result = await Pet.find()
                .populate("idCategoryPet")
                .populate({ path: "idCollections" })
                .populate({
                    path: "idBreed",
                    match: {
                        breedName: { $regex: search, $options: "i" },
                    },
                });

            const filterBreed = result.filter((item) => {
                return item.idBreed !== null;
            });

            res.send({ result: filterBreed });
        } catch (error) {
            console.log(error);
        }
    },
    filterPet: async (req, res) => {
        const filter = req.query;
        try {
            console.log(filter);
        } catch (error) {
            console.log(error);
        }
    },
    searchPet: async (req, res) => {
        const { variable } = req.query;

        try {
            const result = await Pet.find({
                $or: [
                    { petName: { $regex: variable, $options: "i" } },
                    { location: { $regex: variable, $options: "i" } },
                ],
            })
                .populate("idCategoryPet")
                .populate("idBreed")
                .populate({ path: "idCollections" });

            const filterBreed = result.filter((item) => {
                return item.idCategoryPet !== null || item.idBreed !== null;
            });

            res.send({ result });
        } catch (error) {
            console.log(error);
        }
    },
    filterPetCollection: async (req, res) => {
        const { size, gender, alphabet } = req.query;
        try {
            if (size !== "" || gender !== "" || alphabet !== "") {
                const result = await Pet.find({
                    $or: [{ size: size }, { gender: gender }],
                })
                    .populate("idCategoryPet")
                    .populate("idBreed")
                    .populate({ path: "idCollections" })
                    .sort({ petName: alphabet });

                res.send({ result });
            } else {
                const result = await Pet.find({})
                    .populate("idCategoryPet")
                    .populate({ path: "idCollections" })
                    .populate("idBreed");

                res.send({ result });
            }
        } catch (error) {
            console.log(error);
        }
    },
    petByCategory: async (req, res) => {
        const { category } = req.params;
        try {
            const result = await Pet.find()
                .populate({
                    path: "idCategoryPet",
                    match: {
                        categoryName: { $regex: category, $options: "i" },
                    },
                })
                .populate({ path: "idCollections" })
                .populate("idBreed");

            const filterBreed = result.filter((item) => {
                return item.idCategoryPet !== null;
            });

            res.send({ result: filterBreed });
        } catch (error) {
            console.log(error);
        }
    },
    petByCollection: async (req, res) => {
        const { collection } = req.params;
        try {
            const result = await Pet.find({ idCollections: collection })
                .populate("idCategoryPet")
                .populate("idCollections")
                .populate("idBreed");

            res.send({ result: result });
        } catch (error) {
            console.log(error);
            res.send({ message: "internal server error" });
        }
    },
    filterPetByCategory: async (req, res) => {
        const { size, gender, alphabet } = req.query;
        const { category } = req.params;

        try {
            if (size !== "" || gender !== "" || alphabet !== "") {
                const result = await Pet.find({
                    $or: [{ size: size }, { gender: gender }],
                })
                    .populate({
                        path: "idCategoryPet",
                        match: {
                            categoryName: { $regex: category, $options: "i" },
                        },
                    })
                    .populate("idBreed")
                    .populate({ path: "idCollections" })
                    .sort({ petName: alphabet });

                const filterBreed = result.filter((item) => {
                    return item.idCategoryPet !== null;
                });

                res.send({ result: filterBreed });
            } else {
                const result = await Pet.find()
                    .populate({
                        path: "idCategoryPet",
                        match: {
                            categoryName: { $regex: category, $options: "i" },
                        },
                    })
                    .populate("idBreed");

                const filterBreed = result.filter((item) => {
                    return item.idCategoryPet !== null;
                });

                res.send({ result: filterBreed });
            }
        } catch (error) {
            console.log(error);
        }
    },
    filterPetByCategoryBreed: async (req, res) => {
        const { size, gender, alphabet } = req.query;
        const { breed, category } = req.params;

        try {
            if (size !== "" || gender !== "" || alphabet !== "") {
                let catg = category.charAt(0).toUpperCase() + category.slice(1);

                let result = await PetUpForAdoption.find()
                    .populate({ path: "idUser" })
                    .populate({
                        path: "idPet",
                        populate: [
                            {
                                path: "idBreed",
                            },
                            {
                                path: "idCategoryPet",
                            },
                            {
                                path: "idUser",
                            },
                        ],
                    })
                    .populate({ path: "idRequest" });

                const filterPet = result.filter(
                    (item) =>
                        item.idPet.size === size &&
                        item.idPet.gender === gender &&
                        item.idPet.idCategoryPet.categoryName === catg &&
                        item.idPet.idBreed.breedName === breed
                );

                if (alphabet === "asc") {
                    let filterAsc = filterPet.sort((a, b) =>
                        a.idPet.petName > b.idPet.petName
                            ? 1
                            : b.idPet.petName > a.idPet.petName
                            ? -1
                            : 0
                    );
                    res.send({
                        result: filterAsc,
                    });
                } else if (alphabet === "desc") {
                    let filterDesc = filterPet.sort((a, b) =>
                        a.idPet.petName < b.idPet.petName
                            ? 1
                            : b.idPet.petName < a.idPet.petName
                            ? -1
                            : 0
                    );

                    res.send({ result: filterDesc });
                }
            } else {
                let result = await PetUpForAdoption.find()
                    .populate({ path: "idUser" })
                    .populate({
                        path: "idPet",
                        populate: [
                            {
                                path: "idBreed",
                                match: {
                                    breedName: { $regex: breed, $options: "i" },
                                },
                            },
                            {
                                path: "idCategoryPet",
                            },
                            {
                                path: "idUser",
                            },
                        ],
                    })
                    .populate({ path: "idRequest" });

                const filterBreed = filterPet.filter((item) => {
                    return item.idPet.idBreed !== null;
                });

                res.send({ result: filterBreed });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
