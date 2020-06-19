const Location = require("../db/models/location");

module.exports = (app) => {
    require('./auth')(app);
    require('./user')(app);
    require('./location')(app);
    require('./details')(app);

    /*
    GET home page.
    */
    app.get('/', (req,res)=>{
        var query = Location.find({ isValidated: true }).lean();
        query.exec(function (err, locations) {
            res.render('home',{ locations });
        });
    });
};
