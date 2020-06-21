module.exports = (app) => {
    const exphbs  = require('express-handlebars');
    const handlebars = exphbs.create({
        helpers: {
            imageToBase64: (data) => data.buffer.toString('base64'),
            isTrue: (value, options) => value === true || value === 1 ? options.fn(this) : options.inverse(this),
            isFalse: (value, options) => value === false || value === 0 ? options.fn(this) : options.inverse(this),
            truncate :(str, len)=> {
                if (str.length > len) {
                    var new_str = str.substr (0, len+1);

                    while (new_str.length) {
                        var ch = new_str.substr ( -1 );
                        new_str = new_str.substr ( 0, -1 );

                        if (ch == ' ') {
                            break;
                        }
                    }

                    if ( new_str == '' ) {
                        new_str = str.substr ( 0, len );
                    }

                    return  new_str +'...' ;
                }
                return str;
            }
        }
    });

    /*
    View engine setup
    */
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');
};
