const mongoose = require("mongoose");
const users = require("../db/models/user");
const locations = require("../db/models/location");
const getHashedPassword = require("./auth").getHashedPassword;

const datalize = require('datalize');
const field = datalize.field;

loginController =
{
loginVarify : (email,password) => {
  console.log(password)
  hashedPassword=getHashedPassword(password)
  
   return new Promise((resolve,reject)=>{
    users.findOne({ email : email}).then((user) => {
     if(user===null) { reject (new Error("E-mail not register , Pl. Varify E-mail")); }
     if(user.password != hashedPassword ) { reject (new Error("Invalid Password Pl.try again")); }
      resolve(user);
    })
  })
  
}
  
}

module.exports = loginController