module.exports = (app) => {
    const exphbs  = require('express-handlebars');
    const handlebars = exphbs.create({
        helpers: {
            imageToBase64: (data) => data.buffer.toString('base64'),
            isTrue: (value, options) => value === true || value === 1 ? options.fn(this) : options.inverse(this),
            isFalse: (value, options) => value === false || value === 0 ? options.fn(this) : options.inverse(this)
        }
    });

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
};
