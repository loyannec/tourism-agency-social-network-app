const mongoose = require("mongoose");

/*
Comment schema
*/
const commentSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', commentSchema);;
