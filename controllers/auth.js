const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const TOKENSECRET = "kdsdsjaklfjaskl";
const users = require("../db/models/user");

module.exports =
{
 getHashedPassword : (password ) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('hex');
    return hash;
},

varifyToken: (req,res,next)=>{
    const token=req.cookies.authtoken;
    if(!token) 
    {
        res.status(401);
        res.render('Error',{title:"Error", isError:true, logout:false,bgclass:"background-color:gray",Error:"Access Denied , Please Login to Access " });
        return 0;
    }

    try{
        const varified = jwt.verify(token,TOKENSECRET)
        req.user = varified.id;
        res.user = varified.id;;
        next();
    }
    catch(err)
    {
        res.status(400);
        res.render('Error',{title:"Error", isError:true, logout:false,bgclass:"background-color:gray",Error:"Access Denied , Please Login to Access " });
    }

},
setTocken :(res,userid)=>
{
    const token = jwt.sign({id:userid},TOKENSECRET);
    res.cookie('authtoken',token );
},

isUserLoggedin : (req)=>
{
    const token = req.cookies.authtoken;
    if(!token) 
    {
        //false ,no token , not login
        return false;
    }

    try{
        const varified = jwt.verify(token,TOKENSECRET)
        //User is loggedin
        return true
    }
    catch(err)
    {
        return false;
    }
},

setUser : function(req, res, next){
    const token=req.cookies.authtoken;
    if(!token) 
    {
            res.locals.user=null;
            res.user=null
            req.user=null
            next();
    }
    else{
    try{
        const varified = jwt.verify(token,TOKENSECRET)
        id = varified.id
        try{
            users.findOne({ _id : id }).then((user) => {
            if(user===null) { 
                res.locals.user=null; 
                res.user = null;
                req.user = null;
                next()
             }
            else
            { 
                res.locals.user = {_id:user._id , firstName:user.firstName ,lastName:user.lastName,email:user.email, isAdmin:user.isAdmin}
                res.user = {_id:user._id , firstName:user.firstName ,lastName:user.lastName,email:user.email, isAdmin:user.isAdmin}
                req.user = {_id:user._id , firstName:user.firstName ,lastName:user.lastName,email:user.email, isAdmin:user.isAdmin}
                next()
        
            }
           })
       }catch(err){
           console.log("error"+err);
           
        }
    }catch(err)
    {
        console.log("Error "+err)
    }
  }
 

}

}