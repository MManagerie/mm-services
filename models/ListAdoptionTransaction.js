// Model for ListAdoptionTransaction
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const listAdoptionTransactionSchema = new Schema({
    idPetUpForAdoption: {
        type: Schema.Types.ObjectId,
        ref: 'petUpforAdoption',
        required: true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    petName: {
        type: String
    },
    petCategory: {
        type: String
    },
    breed: {
        type: String
    },
    ownerPetName: {
        type: String
    },
    adopterPetName: {
        type: String
    },
    status: {
        type: String,
        default: "PENDING"
    }
}, {timestamps: true})

const ListAdoptionTransaction = mongoose.model('listAdoptionTransaction', listAdoptionTransactionSchema);

module.exports = ListAdoptionTransaction;