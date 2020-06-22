const Location = require("../db/models/location");
const auth = require("./auth");
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    /*
    Display add location form
    */
    app.get('/location/add', auth.verifyToken, (req, res) => {
        res.render('location/new', { user: req.user });
    });

    /*
    Submits new location
    */
    app.post('/location/add', upload.single('image'), auth.verifyToken, (req, res) => {
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

    app.get('/location/validate', [auth.verifyToken, auth.isAdministrator], (req, res) => {
        //List of locations where isValidated is false
        var query = Location.find({ isValidated: false }).lean();
        query.exec(function (err, locations ) {
            res.render('location/validate', { user: req.user, locations });
        });
    });

    app.post('/location/validate', [auth.verifyToken, auth.isAdministrator], (req, res) => {
        var ids = { _id: { $in: req.body.id } };
        var update = { isValidated: true };
        Location.updateMany(ids, update, () => {
            res.redirect("/location/validate");
        });
    });

    app.post('/location/search', auth.loadUser, async (req, res) => {
        const findLocation = req.body.selectLocation;

        try {
            const locations = await Location.find( { name: { $regex: findLocation, $options: 'i'} , isValidated: true}).lean();
            res.render('home', { user: req.user, locations });
        } catch (err) {
             console.log("error"+err);
        }
    });
};
