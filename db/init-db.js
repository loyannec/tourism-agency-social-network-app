require('./db-connection')((db) => {
    // Create 'users' collection in new db database
    db.createCollection("users", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // Close the connection to db when you are done with it
    });

    db.createCollection("locations", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // Close the connection to db when you are done with it
    });

    db.createCollection("userLocationRecomendations", function(err, result) {
        if (err) throw err;
        console.log("Collection is created!");
        // Close the connection to db when you are done with it
    });

    setTimeout(() => {
        db.close();
    }, 1000);
});
