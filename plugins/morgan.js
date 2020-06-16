/*
Log in or show which requests are arriving on our HTTP server
*/
module.exports = (app) => {
    const morgan = require('morgan');

    app.use(morgan('combined'));
};
