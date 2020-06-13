module.exports = (app) => {
    /*
    Display respective location page
    */
    app.get('/location', (req, res) => {
        res.render('location');
    });

    /*
    Display user register page
    */
    app.get('/location/validate', (req, res) => {
        res.render('location');
    });

    /*
    Display respective location page
    */
    app.post('/location', (req, res) => {
        res.render('location');
    });
};
