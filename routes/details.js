const Location = require("../db/models/location");

module.exports = (app) => {
    /*
    Display respective details page
    */
    app.get('/location/:id', (req, res) => {
        Location.findById(req.params.id, (err, location) => {
            if (err) {
                res.send(404);
                return;
            }
            res.render('location/details', { location });
        }).lean();
    });
    /*
    Display respective comments page
    */
    app.get('/location/:id/comments', (req, res) => {
        res.render('details');
    });

    /*
    Display user recommend page
    */
    app.get('/location/:id/recommend', (req, res) => {
        res.render('details');
    });
};
