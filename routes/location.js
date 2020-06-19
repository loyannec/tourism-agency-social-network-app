var location = require("../db/models/locations");
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: '../uploads/'});

module.exports = (app) => {
    /*
    Display respective location page
    */
    app.get('/location', (req, res) => {
        res.render('location');
    });

    app.get('/addLocations', (req,res)=>{
        res.render('addLocation');
     });
 
     /*
     Submits new location
     */
     app.post('/addLocations', upload.single('thumbnail'), (req,res)=>{
         console.log(req);
         var loc = new location();
         loc.name = req.body.name;
         loc.description = req.body.description;
         loc.likes = 0;
         loc.locationImage.data = fs.readFileSync(req.file.path);
         loc.locationImage.contentType = req.file.mimetype;
         loc.comments = [];
 
         //var comment  = loc.comments.create({body:"This is the first Comment", author:"Me"});
         //loc.comments.push(comment);
 
         loc.save(function (err, result) {
             if (err) return console.error(err);
             console.log("Saved!!");
             res.redirect("/");
         });
     });

    /*
    Display user register page
    */
    app.get('/location/validate', (req, res) => {
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

    /*
    Display respective location page
    */
    app.post('/location', (req, res) => {
        res.render('location');
    });
};
