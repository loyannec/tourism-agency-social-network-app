var location = require("../db/model/locations");

module.exports = (app) => {
    /*
    GET home page.
    */
    app.get('/', (req,res)=>{

        var user = {name:"Mags", isAdmin:true};

        var query = location.find({isValidated: true}).lean();
        query.exec(function (err, docs) {
            res.render('home',{user, docs});
        });
    });

    /*
    Display search location
    */
    app.get('/filterlocation');

    /*
    Log out user and display login page.
    */
    app.get('/logout');

    /*
    Display respective Agency Page
    */
    app.get('/gdfgf/:id');

    /*
    Display Register page
    */
    app.get('/register');

    /*
    Submits User details
    */
    app.post('/register');

    /*
    Display search by locations
    */
    app.get('/searchjdjdjdj');

    /*
    Display respective Agency Page
    */
    app.post('/reviews');

    
};