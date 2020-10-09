// Model for PetCollection
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const petCollectionSchema = new Schema(
    {
        collectionName: {
            type: String,
        },
        idPet: {
            type: Schema.Types.ObjectId,
            ref: 'pet',
            required: true
        }
    },
    { timestamps: true }
);

const PetCollection = mongoose.model("petCollection", petCollectionSchema);

module.exports = PetCollection;
