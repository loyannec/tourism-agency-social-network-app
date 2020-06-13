module.exports = (app) => {
    /*
    Display respective comments page
    */
    app.get('/location/comments', (req, res) => {
        res.render('details');
    });

    /*
    Display user recommend page
    */
    app.get('/location/recommend', (req, res) => {
        res.render('details');
    });

    /*
    Display respective details page
    */
    app.get('/location/:id', (req, res) => {
        res.render('details');
    });
};
