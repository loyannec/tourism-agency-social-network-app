/*
This class return a valid connection
*/
module.exports = (callback) => {
    const mongoose = require('mongoose');
    const url = 'mongodb://localhost:27017/tourismDb';

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error'));
    db.once('open', function() {
        console.log("We're connected!");
        callback(db);
    });
};
