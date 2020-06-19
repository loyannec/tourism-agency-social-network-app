module.exports = (app) => {
    const exphbs  = require('express-handlebars');
    const handlebars = exphbs.create({
        helpers: {
            imageToBase64: (data) => {
                console.log(data);
                var image = data.buffer.toString('base64');
                return image;
            }
        }
    });

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
};
