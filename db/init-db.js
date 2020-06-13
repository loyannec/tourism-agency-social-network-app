require('./db-connection')((db, client) => {
    // Create 'users' collection in newdb database
    db.createCollection("users", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // Close the connection to db when you are done with it
        // client.close();
    });

    db.createCollection("locations", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // Close the connection to db when you are done with it
        // client.close();
    });
    db.createCollection("userLocationRecomendations", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // Close the connection to db when you are done with it
        // client.close();
    });
    client.close();
});
