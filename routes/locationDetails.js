const Location = require("../db/models/location");
const Recommendation = require("../db/models/recommendation");
const Comment = require("../db/models/comment");
const User = require("../db/models/user");
const auth = require("./auth");

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

module.exports = (app) => {
    /*
    Display respective details page
    */
    app.get('/location/:id', auth.verifyToken, (req, res) => {
        const locationId = req.params.id;

        Location.findById(locationId, (err, location) => {
            if (err || !location) {
                res.sendStatus(404);
                return;
            }

            Comment.find({ location: locationId }, (err, comments) => {
                Recommendation.findOne({ location: locationId, user: req.user._id }, (err, recommendation) => {
                    countLikesAndDislikesForLocation(locationId, (totalLikes) => {
                        res.render('location/details', {
                            user: req.user,
                            location,
                            comments,
                            recommendation,
                            totalLikes
                        });
                    });
                })
                .lean();
            })
            .sort('-date')
            .populate('user')
            .lean();
        })
        .lean();
    });

    /*
    Insert comment
    */
    app.post('/location/:id/comment', auth.verifyToken, (req, res) => {
        const user = req.user;
        const comment = new Comment();
        comment.user = user._id;
        comment.location = req.params.id;
        comment.message = req.body.comment;

        comment.save((err) => {
            if (err) {
                res.sendStatus(404);
                return;
            }
            res.render('partials/comment', {
                layout: false,
                user: user,
                comment: comment.toObject()
            });
        });
    });

    /*
    Insert recommendation
    */
    app.post('/location/:id/recommend', auth.verifyToken, (req, res) => {
        const query = {
            location: req.params.id,
            user: req.user._id
        }
        const update = { like: req.body.like || null };
        const options = { new: true, upsert: true };

        Recommendation.findOneAndUpdate(query, update, options, (err, recommendation) => {
            recommendation.save((err) => {
                if (err) {
                    res.sendStatus(404);
                    return;
                }
                countLikesAndDislikesForLocation(req.params.id, (count) => {
                    res.send(count);
                });
            });
        });
    });
};
