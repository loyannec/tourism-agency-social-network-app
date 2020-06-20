const Location = require("../db/models/location");
const Recommendation = require("../db/models/recommendation");
const Comment = require("../db/models/comment");
const User = require("../db/models/user");

module.exports = (app) => {
    /*
    Display respective details page
    */
    app.get('/location/:id', (req, res) => {
        const locationId = req.params.id;

        Recommendation.find({ locationId }, (err, recommendations) => {
            if (err || !recommendations) {
                res.send(404);
                return;
            }

            const location = recommendations[0].locationId;
            var comments = [];

            for (var recommendationIndex in recommendations) {
                const recommendation = recommendations[recommendationIndex];
                for (var commentIndex in recommendation.comments) {
                    comments.push({
                        user: recommendation.userId,
                        comment: recommendation.comments[commentIndex]
                    });
                }
            }

            comments = comments.sort((a, b) => {
                if (a.comment.date > b.comment.date) {
                    return -1;
                } else if (a.comment.date < b.comment.date) {
                    return 1;
                }
                return 0;
            });

            res.render('location/details', { location, comments });
        })
        .populate('userId')
        .populate('locationId')
        .lean();
    });

    /*
    Insert comment
    */
    app.post('/location/:id/comment', (req, res) => {
        User.find((err, users) => {         // TODO: get authenticated user
            if (err || !users) {
                res.send(404);
                return;
            }

            const user = users[0];
            const queryData = {
                locationId: req.params.id,
                userId: user._id
            };

            Recommendation.findOneAndUpdate(queryData, queryData, { new: true, upsert: true }, (err, recommendation) => {
                if (err) {
                    res.send(404);
                    return;
                }

                const comment = new Comment();
                comment.message = req.body.comment;
                recommendation.comments.push(comment);

                recommendation.save((err) => {
                    if (err) {
                        res.send(404);
                        return;
                    }
                    res.render('partials/comment', {
                        layout: false,
                        user: user,
                        comment: comment.toObject()
                    });
                });
            });
        })
        .lean();
    });

    /*
    Insert recommendation
    */
    app.get('/location/:id/recommend', (req, res) => {
        res.render('details');
    });
};
