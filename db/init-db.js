function createCollection(db, collectionName) {
    // Create collection in new db database
    db.createCollection(collectionName, function (err) {
        if (err) throw err;
        console.log(`Collection ${collectionName} is created!`);
    });
}

require('./db-connection')((db) => {
    createCollection(db, 'users');
    createCollection(db, 'locations');
    createCollection(db, 'comments');
    createCollection(db, 'recommendations');

    setTimeout(() => {
        db.close();
    }, 1000);
});
