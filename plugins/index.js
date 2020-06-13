module.exports = (app) => {
    require('./express.js')(app);
    require('./cookie-parser')(app);
    require('./livereload')(app);
    require('./handlebars')(app);
    require('./http-errors')(app);
    require('./morgan')(app);
}
