const emailService = require('../helpers/nodemailer');
const cryptoRandomString = require("crypto-random-string");
const UserAccount = require('../models/UserAccount');
require('dotenv').config()

module.exports = {
    verificationEmail: async(req, res) => {
        const baseUrl = 'http://localhost:8000';
        try {
            const user = await UserAccount.findById(req.body.id);

            if (!user) {
                res.status(400).json({ 
                    success: false 
                });
            } else {
                const secretCode = cryptoRandomString({
                    length: 6,
                });

                const datas = await UserAccount.findOneAndUpdate({
                    '_id': user._id
                },{
                    code: secretCode,
                })

                const data = {
                    from: `Mini Menagerie <${process.env.EMAIL_USERNAME}>`,
                    to: user.email,
                    subject: "Your Activation Link for YOUR APP",
                    text: `Please use the following link within the next 10 minutes to activate your account on YOUR APP: ${baseUrl}/verification/verify-account/${user._id}/${secretCode}`,
                    html: `<p>Please use the following link within the next 10 minutes to activate your account on YOUR APP: <strong><a href="${baseUrl}/verification/verify-account/${user._id}/${secretCode}" target="_blank">Email Verification</a></strong></p>`,
                };
                await emailService.sendMail(data);

                res.status(400).json({ 
                    success: true 
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ 
                success: false
            });
        }
    },
    verificationAccount: async(req, res) => {
        try {
            const user = await UserAccount.findById(req.params.id);
            const response = await UserAccount.findOne({
                email: user.email,
                code: req.params.secretCode,
            });

            if (!response) {
                res.sendStatus(401);
            } else {
                const data = await UserAccount.updateOne(
                    { email: user.email },
                    { statusVerification: true }
                );
                const redirectPath = 'http://localhost:3000/account/verified';

                res.redirect(redirectPath);
            }
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }
}