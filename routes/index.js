var location = require("../db/model/locations");

module.exports = (app) => {
    /*
    GET home page.
    */
    //app.get('/');

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

    /*
    Display add location form
    */
    app.get('/addLocations', (req,res)=>{
        res.render('addLocation');
    });

    /*
    Submits new location
    */
    app.post('/addLocations', (req,res)=>{
        var loc = new location();
        loc.name = req.body.name;
        loc.description = req.body.description;
        loc.likes = 0;
        loc.locationImage = Buffer.from("Test");

        //var comment  = loc.comments.create({body:"This is the first Comment", author:"Me"});
        //loc.comments.push(comment);

        loc.save(function (err, result) {
            if (err) return console.error(err);
            console.log("Saved!!");
            res.redirect("/");
        });
    });
};