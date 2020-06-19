const mongoose = require("mongoose");

/*
Locations schema
*/
const commentSchema = mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
});

const locationsSchema = mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true
    },
    locationImage: {
        data: Buffer,
        contentType: String,
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
    comments: [commentSchema],
    likes: {
        type: Number,
        required: true
    }
});

const location = mongoose.model('location', locationsSchema);
module.exports = location;
