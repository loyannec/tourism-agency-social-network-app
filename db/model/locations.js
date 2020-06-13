const mongoose = require("mongoose");

/*
Locations schema
*/
const locationsSchema = mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true
    },
    locationImage: {
        type: Buffer,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isValidated: {
        type: Boolean,
        required: true,
        default:false
    },
    comments: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
});

const locations = module.exports = mongoose.model('location', locationsSchema);
