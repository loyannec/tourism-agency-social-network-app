module.exports = (app) => {
    const location = require("../db/models/location");
    require('./auth')(app);
    require('./user')(app);
    require('./location')(app);
    require('./details')(app);

    
    /*
    GET home page.
    */
    app.get('/', async (req, res) => {
            try{
         const locations = await location.find({isValidated:true}).lean();
         res.render('home',{locations});
       }catch(err){
           console.log("error"+err);
      }
       
    
    });

    app.post('/search', async (req, res) => {
        findLocation= req.body.selectLocation;
        
        try{
          const locations = await location.find({ name: { $regex: findLocation, $options: 'i' }}).lean();
          res.render('home',{locations});
         }catch(err){
             console.log("error"+err);
        
         }
      });
  
};
