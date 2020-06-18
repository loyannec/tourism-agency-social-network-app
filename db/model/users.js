const mongoose = require("mongoose");

/*
Users schema
*/
const usersSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim:true,
        required: true
    },
    lastName: {
        type: String,
        trim:true,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    }
});

const user = mongoose.model('user', usersSchema);
module.exports = user;
