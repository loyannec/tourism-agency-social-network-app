const mongoose = require("mongoose");

/*
Locations schema
*/
const userLocationRecomendationSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
        },
    locationId :{
        type: Schema.Types.ObjectId,
        ref: 'location',
        required: true
        },
    comments: {
        type: String,
        required: true
        },
    recomends: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('userLocationRecomendation', userLocationRecomendationSchema);
