const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

/*
Locations schema
*/
const recommendationSchema = mongoose.Schema({
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
    like: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('recommendation', recommendationSchema);
