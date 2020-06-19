const Location = require("../db/models/location");
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    /*
    Display add location form
    */
    app.get('/location/add', (req, res) => {
        res.render('addlocation');
    });

    /*
    Submits new location
    */
    app.post('/location/add', upload.single('image'), (req, res) => {
        var location = new Location();
        var imageData = fs.readFileSync(req.file.path);

        location.name = req.body.name;
        location.description = req.body.description;
        location.image.data = new Buffer(imageData.toString('base64'), 'base64');
        location.image.contentType = req.file.mimetype;

        location.save(function (err, result) {
            if (err) throw err;
            res.redirect("/");
        });
    });

    app.get('/location/validate', (req, res) => {
        //List of locations where isValidated is false
        var query = Location.find({ isValidated: false }).lean();
        query.exec(function (err, locations ) {
            res.render('validate', { locations });
        });
    });

    app.post('/location/validate', (req, res) => {
        var ids = { _id: { $in: req.body.id } };
        var update = { isValidated: true };
        Location.updateMany(ids, update, () => {
            res.redirect("/location/validate");
        });
    });
};
