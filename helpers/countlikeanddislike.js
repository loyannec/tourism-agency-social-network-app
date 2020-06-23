const Recommendation = require("../db/models/recommendation");

module.exports = 
{
  countLikesAndDislikesForLocation : function(location, callback) {
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
}