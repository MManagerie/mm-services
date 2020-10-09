// Model for Pet
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const petSchema = new Schema({
    idCategoryPet: {
        type: Schema.Types.ObjectId,
        ref: 'categoryPet',
        required: true
    },
    idBreed: {
        type: Schema.Types.ObjectId,
        ref: 'breed',
        required: true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    idCollections: {
        type: Schema.Types.ObjectId,
        ref: 'petCollection',
    },
    petName: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    weight: {
        type: String
    },
    size: {
        type: String
    },
    location: {
        type: String
    },
    about: {
        type: String
    },
    image: [{
        type: String
    }],
    fee: {
        type: String
    }
}, {timestamps: true})

const Pet = mongoose.model('pet', petSchema);

module.exports = Pet;