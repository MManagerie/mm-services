// Model for PetUpForAdoption
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const petUpForAdoptionSchema = new Schema({
    idRequest: {
        type: Schema.Types.ObjectId,
        ref: 'formRequest',
        required: false
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    idPet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    fee: {
        type: Number
    },
    status: {
        type: String,
        default: 'Available'
    }
}, {timestamps: true})

const PetUpForAdoption = mongoose.model('petUpforAdoption', petUpForAdoptionSchema);

module.exports = PetUpForAdoption;