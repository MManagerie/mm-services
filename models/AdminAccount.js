// Model for AdminAccount
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const adminAccountSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

const AdminAccount = mongoose.model('adminAccount', adminAccountSchema);

module.exports = AdminAccount;