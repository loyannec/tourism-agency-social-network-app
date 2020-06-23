const Location = require("../db/models/location");
const auth = require("./auth");
const Recommendation = require("../db/models/recommendation");
const getLocations = require("../helpers/getLocations").getLocations;
module.exports = (app) => {
    require('./user')(app);
    require('./location')(app);
    require('./locationDetails')(app);

    /*
    GET home page.
    */
    app.get('/',auth.loadUser, async (req, res) => {
       var arrayLocation = await getLocations();
       res.render('home', { user: req.user, arrayLocation });
    });
}


