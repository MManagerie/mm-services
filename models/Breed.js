// Model for Breed
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const breedSchema = new Schema({
    idCategoryPet: {
        type: Schema.Types.ObjectId,
        ref: 'categoryPet',
        required: true
    },
    breedName: {
        type: String
    }
}, {timestamps: true})

const Breed = mongoose.model('breed', breedSchema);

module.exports = Breed;