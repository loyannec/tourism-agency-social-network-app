const Location = require("../db/models/location");
const auth = require("./auth");
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Recommendation = require("../db/models/recommendation");


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
        var arrayLocation = new Array();
        var query = Location.find({ name: { $regex: findLocation, $options: 'i'} , isValidated: true}).lean();
        query.exec(function (err, locations) {
            locations.forEach(function(location){
                locationId = location._id;
                Recommendation.findOne({ location: location._id }, (err, recommendation) => {
                    countLikesAndDislikesForLocation(location._id, (totalLikes) => {
                    arrayLocation.push({_id:location._id,name:location.name,description :location.description,image:location.image,likes:totalLikes.likes,dislikes:totalLikes.dislikes });
                    })
            })
            })
            res.render('home', { user: req.user, arrayLocation });         
        });
    }); 
};

function countLikesAndDislikesForLocation(location, callback) {
    Recommendation.count({ location, like: true }, (err, likes) => {
        if (err) {
            callback(null);
            return;
        }
        Recommendation.count({ location, like: false }, (err, dislikes) => {
            callback(err ? null : { likes, dislikes });
        });
    });
}
