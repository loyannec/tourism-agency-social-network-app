const mongoose = require("mongoose");

/*
Locations schema
*/
const locationsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    locationImage: {
        type: String,
        required: true
    },
    description: {
        type: String
        required: true
    },
    isValidated: {
        type: Boolean
        required: true
    },
    comments: {
        type: String
        required: true
    },
    likes: {
        type: Number
        required: true
    }
});

const locations = module.exports = mongoose.model('locations', locationsSchema);
