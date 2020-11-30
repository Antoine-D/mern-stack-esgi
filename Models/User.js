const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    validated_email: {
        type: Boolean,
        required: false
    },
    token: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', User );