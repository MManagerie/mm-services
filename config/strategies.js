const passport = require('passport');
require('dotenv').config()
const UserAccount = require('../models/UserAccount');
const Users = require('../models/Users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const {createToken} = require('../helpers/token');

module.exports = {
    strategies : () => {
        passport.use(new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    ExtractJwt.fromUrlQueryParameter('secret_token'),
                    ExtractJwt.fromHeader('secret_token'),
                    ExtractJwt.fromAuthHeaderAsBearerToken(),
                ]),
                secretOrKey:process.env.SECRET_KEY_TOKEN
            },
            async (jwt_payload, done) => {
                try {
                    const user = await UserAccount.findOne({_id: jwt_payload.id});

                    if(!user){
                        return done(null, false, {message : "User not found"})
                    } else {
                        return done(null, user)
                    }
                }
                catch(error){
                    res.status(500).json({
                        message: "internal server error",
                    })
                }
            }
        ))

        passport.use('google', new GoogleStrategy(
            {
                clientID:process.env.CLIENT_ID_GOOGLE,
                clientSecret:process.env.CLIENT_SECRET_GOOGLE,
                callbackURL:process.env.CALLBACK_URL_GOOGLE,
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
            (accessToken, refreshToken, profile, callback) => {
                UserAccount.findOne({
                    providerId: profile._json.sub
                })
                .populate({ path:'idUser'})
                .exec((err, user) => {
                    if(user === null) {
                        UserAccount.findOne({
                            email: profile._json.email
                        }, (err, checkEmail) => {
                            if(checkEmail === null) {
                                Users.create({
                                    avatar: profile._json.picture
                                }, (err, avatar) => {
                                    UserAccount.create({
                                        providerId: profile._json.sub,
                                        providerName: profile.provider,
                                        email: profile._json.email,
                                        idUser: avatar._id
                                    }, (err, user) => {
                                        console.log(user);
                                        UserAccount.findOne({
                                            _id: user._id
                                        })
                                        .populate({ path:'idUser'})
                                        .exec((err, user) => {
                                            const dataUser = {
                                                id: user._id,
                                                fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                                email: user.email,
                                                avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                            }
                                            // user login => kasih token
                                            const token = createToken(dataUser);
                                            const data = {
                                                token,
                                                id: user._id,
                                                fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                                email: user.email,
                                                avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                            }
                                            return callback(err, data);
                                        })
                                    })
                                })
                            }else {
                                UserAccount.findOneAndUpdate({
                                    email: checkEmail.email
                                }, {
                                    providerId: profile._json.sub,
                                    providerName: profile.provider,
                                })
                                .populate({ path:'idUser'})
                                .exec((err, user) => {
                                    const dataUser = {
                                        id: user._id,
                                        fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                        email: user.email,
                                        avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                    }
                                    // user login => kasih token
                                    const token = createToken(dataUser);
                                    const data = {
                                        token,
                                        id: user._id,
                                        fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                        email: user.email,
                                        avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                    }
                                    return callback(err, data);
                                })
                            }
                        })
                    }else {
                        const dataUser = {
                            id: user._id,
                            fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                            email: user.email,
                            avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                        }
                        // user login => kasih token
                        const token = createToken(dataUser);
                        const data = {
                            token,
                            id: user._id,
                            fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                            email: user.email,
                            avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                        }
                        return callback(err, data);
                    }
                })
            }
        ));

        passport.use('facebook', new FacebookStrategy(
            {
                clientID:process.env.CLIENT_ID_FACEBOOK,
                clientSecret:process.env.CLIENT_SECRET_FACEBOOK,
                callbackURL:process.env.CALLBACK_URL_FACEBOOK,
                profileFields: ['id', 'displayName', 'photos', 'email']
            },
            (accessToken, refreshToken, profile, callback) => {
                console.log(profile._json.picture);
                UserAccount.findOne({
                    providerId: profile._json._id
                })
                .populate({ path:'idUser'})
                .exec((err, user) => {
                    if(user === null) {
                        UserAccount.findOne({
                            email: profile._json.email
                        }, (err, checkEmail) => {
                            if(checkEmail === null) {
                                Users.create({
                                    avatar: profile._json.picture.data.url
                                }, (err, avatar) => {
                                    UserAccount.create({
                                        providerId: profile._json._id,
                                        providerName: profile.provider,
                                        email: profile._json.email,
                                        idUser: avatar._id
                                    }, (err, user) => {
                                        UserAccount.findOne({
                                            _id: user._id
                                        })
                                        .populate({ path:'idUser'})
                                        .exec((err, user) => {
                                            const dataUser = {
                                                id: user._id,
                                                fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                                email: user.email,
                                                avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                            }
                                            // user login => kasih token
                                            const token = createToken(dataUser);
                                            const data = {
                                                token,
                                                id: user._id,
                                                fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                                email: user.email,
                                                avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                            }
                                            return callback(err, data);
                                        })
                                    })
                                })
                            }else {
                                UserAccount.findOneAndUpdate({
                                    email: checkEmail.email
                                }, {
                                    providerId: profile._json.sub,
                                    providerName: profile.provider,
                                })
                                .populate({ path:'idUser'})
                                .exec((err, user) => {
                                    const dataUser = {
                                        id: user._id,
                                        fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                        email: user.email,
                                        avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                    }
                                    // user login => kasih token
                                    const token = createToken(dataUser);
                                    const data = {
                                        token,
                                        id: user._id,
                                        fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                                        email: user.email,
                                        avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                                    }
                                    return callback(err, data);
                                })
                            }
                        })
                    }else {
                        const dataUser = {
                            id: user._id,
                            fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                            email: user.email,
                            avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                        }
                        // user login => kasih token
                        const token = createToken(dataUser);
                        const data = {
                            token,
                            id: user._id,
                            fullName: user.idUser.fullName == null ? null : user.idUser.fullName,
                            email: user.email,
                            avatar: user.idUser.avatar == null ? null :user.idUser.avatar
                        }
                        return callback(err, data);
                    }
                })
            }
        ));
        
        passport.serializeUser(function(user, done) {
            console.log(user);
            done(null, user.id);
        });
          
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
        });
    }
}