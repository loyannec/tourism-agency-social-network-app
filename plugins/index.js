module.exports = (app) => {
    require('./express.js')(app);
    require('./cookie-parser')(app);
    require('./livereload')(app);
    require('./handlebars')(app);
    require('./morgan')(app);
}
