module.exports = (app) => {
    const exphbs  = require('express-handlebars');
    const handlebars = exphbs.create({
        helpers: {
            imageToBase64: (data) => data.buffer.toString('base64')
        }
    });

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
};
