// Model for PetImage
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const petImageSchema = new Schema({
    idPet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    urlImage: {
        type: String
    }
}, {timestamps: true})

const PetImage = mongoose.model('petImage', petImageSchema);

module.exports = PetImage;