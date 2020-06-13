module.exports = (app) => {
    require('./auth')(app);
    require('./user')(app);
    require('./location')(app);
    require('./details')(app);

    /*
    GET home page.
    */
    app.get('/', (req, res) => {
        res.render('home');
    });
};
