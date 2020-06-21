const User = require('./models/user');
const hash = require('../helpers/hash');

function createCollection(db, collectionName) {
    // Create collection in new db database
    db.createCollection(collectionName, function (err) {
        if (err) throw err;
        console.log(`Collection ${collectionName} is created!`);
    });
}

function addAdministrator(callback) {
    const query = { isAdmin: true };
    const update = {
        isAdmin: true,
        email: 'admin@tourism.com',
        firstName: 'System',
        lastName: 'Administrator',
        password: hash('1234')
    };
    User.findOneAndUpdate(query, update, { new: true, upsert: true }, (err, admin) => {
        if (err) throw err;
        admin.save(callback);
    });
}

require('./db-connection')((db) => {
    createCollection(db, 'users');
    createCollection(db, 'locations');
    createCollection(db, 'comments');
    createCollection(db, 'recommendations');

    setTimeout(() => {
        addAdministrator((err) => {
            if (err) throw err;
            db.close();
        });
    }, 1000);
});
