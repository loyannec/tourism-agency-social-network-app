const Location = require("../db/models/location");
const Recommendation = require("../db/models/recommendation");
const Comment = require("../db/models/comment");
const User = require("../db/models/user");

module.exports = (app) => {
    /*
    Display respective details page
    */
    app.get('/location/:id', (req, res) => {
        Location.findById(req.params.id, (err, location) => {
            if (err) {
                res.send(404);
                return;
            }

            res.render('location/details', { location });
        }).lean();
    });

    /*
    Insert comment
    */
    app.post('/location/:id/comment', (req, res) => {
        User.find((err, users) => {         // TODO: get authenticated user
            if (err) {
                res.send(404);
                return;
            }
            const queryData = {
                locationId: req.params.id,
                userId: users[0]._id
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
                    res.send(200);
                });
            });
        }).lean();
    });

    /*
    Insert recommendation
    */
    app.get('/location/:id/recommend', (req, res) => {
        res.render('details');
    });
};
