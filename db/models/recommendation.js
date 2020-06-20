const mongoose = require("mongoose"),
      Schema = mongoose.Schema;
const Comment = require("./comment");

/*
Locations schema
*/
const recommendationSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    locationId: {
        type: Schema.Types.ObjectId,
        ref: 'location',
        required: true
    },
    comments: {
        type: [Comment.schema],
        default: []
    },
    recomends: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('recommendation', recommendationSchema);
