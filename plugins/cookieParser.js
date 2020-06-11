/*
Middleware which parses cookies attached to the client request object
*/
module.exports = (app) => {
    const cookieParser = require('cookie-parser');

    app.use(cookieParser());
};
