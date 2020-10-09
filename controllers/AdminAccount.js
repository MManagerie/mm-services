// Controllers for AdminAccount
const AdminAccount = require('../models/AdminAccount');
const bcrypt = require("bcrypt");
const {createToken} = require('../helpers/token');

module.exports = {
        login: async(req, res) => {
            try{
            const {email, password} = req.body;
            const admin = await AdminAccount.findOne({
                'email': email
            })
            if(admin) {
                const comparePass = await bcrypt.compare(password, admin.password);
                if(!comparePass){
                    res.status(400).json({
                        message: 'password tidak benar',
                    })
                    
                } else {
                    const dataAdmin = {
                        id: admin._id,
                        email: admin.email
                    }
                    // user login => kasih token
                    const token = createToken(dataAdmin)
                    res.status(200).json({
                        message: "Selamat datang",
                        token,
                        admin: dataAdmin
                    })
                }
            }else {
                res.status(500).json({
                        message: 'password tidak benar',
                    })
            }
        }
        catch(error){
            console.log(error);
        }
    
    },
    getAllData: (req, res) => {
        AdminAccount.find()
        .then(result => {
            res.status(200).send({
                message: 'Get all data AdminAccount',
                result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: 'Internal server error',
                error
            })
        })
    },
    createData: (req, res) => {
        const {email, password} = req.body;
        bcrypt.hash(password, 10, (error, hashedPassword) => {
            if(error) {
                res.status(400).send({
                    message: 'error',
                    error
                })
            }else {
                AdminAccount.create({
                    email: email,
                    password: hashedPassword
                })
                .then(() => {
                    res.status(200).send({
                        message: 'success',
                    })
                })
                .catch(error => {
                    res.status(400).send({
                        message: 'error',
                        error
                    })
                })
            }
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        AdminAccount.findOne({
            '_id': id
        })
        .then(result => {
            if(!result) {
                res.status(404).send({
                    message: 'detail data CategoryPet not found'
                })
            }
            res.status(200).send({
                message: 'Get all detail data CategoryPet',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    updateData: async(req,res) => {
        const {id} = req.params;
        const {password} = req.body;
        if(password) {
            bcrypt.hash(password, 10, (error, hashedPassword) => {
                if(error) {
                    res.status(400).send({
                        message: 'error',
                        error
                    })
                }else {
                    AdminAccount.findOneAndUpdate(
                        {'_id': id},
                    {
                        ...req.body,
                        password: hashedPassword
                    })
                    .then(() => {
                        res.status(200).send({
                            message: 'success',
                        })
                    })
                    .catch(error => {
                        res.status(400).send({
                            message: 'error',
                            error
                        })
                    })
                }
            })
        }
        AdminAccount.findOneAndUpdate({ 
            '_id' : id
        },req.body)
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    deleteData : (req, res) => {
        const {id} = req.params;
        AdminAccount.deleteOne({
            '_id' : id
        })
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    }
}