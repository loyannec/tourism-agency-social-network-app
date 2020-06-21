const Location = require("../db/models/location");
const auth = require("./auth");

module.exports = (app) => {
    require('./user')(app);
    require('./location')(app);
    require('./locationDetails')(app);

    /*
    GET home page.
    */
    app.get('/', auth.loadUser, (req, res) => {
        var query = Location.find({ isValidated: true }).lean();
        query.exec(function (err, locations) {
            res.render('home', { user: req.user, locations });
        });
    });
};
