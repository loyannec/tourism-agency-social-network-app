const mongoose = require("mongoose");

/*
Users schema
*/
const usersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String
        required: true
    },
    password: {
        type: String
        required: true
    },
    confirmPassword: {
        type: String
        required: true
    }
});

const users = module.exports = mongoose.model('users', usersSchema);
