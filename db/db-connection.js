/*
This class return a valid connection
*/
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = (callback) => {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;

        const db = client.db("touristsDb");
        callback(db, client);
    });
};
