var location = require("../db/model/locations");

module.exports = (app) => {
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
        loc.comments = [];

        //var comment  = loc.comments.create({body:"This is the first Comment", author:"Me"});
        //loc.comments.push(comment);

        loc.save(function (err, result) {
            if (err) return console.error(err);
            console.log("Saved!!");
            res.redirect("/");
        });
    });

    app.get('/validate', (req,res)=>{
        //List of locations where isValidated is false
        var query = location.find({isValidated: false}).lean();
        query.exec(function (err, docs) {
            res.render('validate',{docs});
        });
    });

    app.post('/validate', (req,res)=>{
        var id = { _id: req.body.id };
        var update = { isValidated: true };
        var query = location.findOneAndUpdate(id, update,(err,result)=>{
            var list = location.find({isValidated: false}).lean();
            list.exec(function (err, docs) {
                res.render('validate',{docs});
            });
        });        
    });
};
