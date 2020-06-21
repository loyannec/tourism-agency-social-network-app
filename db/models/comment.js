const mongoose = require("mongoose"),
      Schema = mongoose.Schema;;

/*
Comment schema
*/
const commentSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location',
        required: true
    },
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
