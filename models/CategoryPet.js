// Model for CategoryPet
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const categoryPetSchema = new Schema({
    categoryName: {
        type: String
    }
}, {timestamps: true})

const CategoryPet = mongoose.model('categoryPet', categoryPetSchema);

module.exports = CategoryPet;