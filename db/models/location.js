const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true
    },
    isValidated: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('location', locationSchema);
