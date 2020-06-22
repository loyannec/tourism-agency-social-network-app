const Location = require("../db/models/location");
const auth = require("./auth");
const Recommendation = require("../db/models/recommendation");

module.exports = (app) => {
    require('./user')(app);
    require('./location')(app);
    require('./locationDetails')(app);

    /*
    GET home page.
    */
    app.get('/', auth.loadUser, (req, res) => {
        var arrayLocation = new Array();
        var query = Location.find({ isValidated: true }).lean();
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
}

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
