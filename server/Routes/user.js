const express = require('express');
const User = require('../Models/User');
const userRoutes = express.Router();
const hash = require("password-hash")
const jwt = require('jsonwebtoken');
const secret = require("../config/keys").secret;
const email_pass = require("../config/keys").email_pass;
const email_acc = require("../config/keys").email_acc;

const authenticateJWT = require( '../Middleware/AuthToken');
const nodemailer = require('nodemailer');

userRoutes.route('/').get(authenticateJWT, function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(authenticateJWT, function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/token/:token').get( function (req, res ){
    User.findOne( { token: req.params.token }, function (err, user ) {
        res.json(user);
    });
})

userRoutes.route('/email/:email').get( function(req, res) {
    let email = req.params.email;
    User.findOne( { email: email}, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/new').post(function(req, res) {

    let user = new User(req.body);
    const token = jwt.sign(
        { userId: user._id },
        secret,
        { expiresIn: '1h' });
    user.token = token;
    user.save()
        .then( user => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: email_acc,
                    pass: email_pass
                }
            });
            let mailOptions = {
                from: email_acc,
                to: user.email,
                subject: 'Welcome on Mern Stack !',
                html: "<p>Please confirm your email following the link </p> <a href='" + 'http://localhost:3000/token/'+token + "'> here </a>."
                //text: 'Please confirm your email following the link :
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).json( user );
        })
        .catch( err => {
            res.status(400).json( err.message );
        });

});

userRoutes.route('/update/:id').post( authenticateJWT, function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.name = req.body.name;
            user.lastname = req.body.lastname;
            user.birthdate = req.body.birthdate;
            user.email = req.body.email;
            user.validated_email = req.body.validated_email;
           // user.password = req.body.password;

        user.save().then(user => {
            res.status(200).send("User updated");
        })
            .catch(err => {
                res.status(400).send(err );
            });
    });
});

userRoutes.route('/update_activ/:id').post(  function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
        user.validated_email = req.body.validated_email;
        user.save().then(user => {
            res.status(200).send("Account Activated");
        })
            .catch(err => {
                res.status(400).send(err );
            });
    });
});

userRoutes.route('/delete/:id').delete( authenticateJWT, function(req, res) {
        let id = req.params.id;

        User.findByIdAndRemove(id , function ( err, result ){
            if ( err ) {
                res.status(400).send(err );
            } else {
                res.status(200).send("User deleted");
            }
        } );
    }
)

userRoutes.route('/login').post( function (req, res ){

    User.findOne( { email: req.body.email }, function ( err, user ){
        let errors = {};

        if (!user) {
            errors.message = "Email incorrect";
            res.status(400).json(errors );
        }
        else{
            if( !hash.verify( req.body.password, user.password) ){
                errors.message = "Password incorrect";
                res.status(400).json(errors );
            }
            else if( !user.validated_email){
                errors.message = "Account not confirmed";
                res.status(400).json(errors );
            }
            else{
                //localStorage.clear("user");
                user.token = jwt.sign(
                    {userId: user._id},
                    secret,
                    {expiresIn: '1h'});
                //user.token = token;
                res.json(
                    {
                        token: user
                    }
                );
            }

        }
    });
})

module.exports = userRoutes;
