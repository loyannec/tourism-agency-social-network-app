/*
This class return a valid connection
*/
//const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Tourism';

var mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true});


module.exports = (callback) => {
    // MongoClient.connect(url, function(err, client) {
    //     if (err) throw err;

    //     const db = client.db("Tourism");
    //     callback(db, client);
    // });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("we're connected!");
        callback(db);
    });
};
