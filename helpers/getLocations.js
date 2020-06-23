const Location = require("../db/models/location");
const Recommendation = require("../db/models/recommendation");
const Comment = require("../db/models/comment");
const countLikesAndDislikesForLocation = require("../helpers/countlikeanddislike").countLikesAndDislikesForLocation;
module.exports = 
{
    getLocations :async (findLocation)=>{
        var arrayLocation = new Array();
        var commentscount=0;
        var query;
        if(findLocation)
        {  
            query = Location.find({ name: { $regex: findLocation, $options: 'i'} , isValidated: true}).lean();
        }
        else
        {
            query = Location.find({ isValidated: true }).lean().sort('-name');           
        }
        await query.exec(async function (err, locations) {
            
            locations.forEach(async function(location){
                await Comment.countDocuments({ location: location._id },async(err,count) => {
                    
                    await Recommendation.findOne({ location: location._id }, async(err, recommendation) => {
                        if(err) throw err;
                        if(recommendation==null)
                        { 
                            arrayLocation.push({_id:location._id,name:location.name,description :location.description,image:location.image,likes:0,dislikes:0 , comments:count });
                        }
                        else 
                        { 
                            await countLikesAndDislikesForLocation(location._id, (totalLikes) => {
                            arrayLocation.push({_id:location._id,name:location.name,description :location.description,image:location.image,likes:totalLikes.likes,dislikes:totalLikes.dislikes , comments:count });
                         })
                    }
                }).lean()
             }).lean()//end of count  
        })
     });
    
    return arrayLocation;
   }
}