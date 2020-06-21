module.exports = (app) => {
    const datalize = require('datalize');
    const field = datalize.field;
    const {loginVarify} = require("../controllers/logincontroller")
    const {setTocken,isUserLoggedin} = require("../controllers/auth.js");
    /*      Display respective login page      */
    app.get('/user/login', (req, res) => {
      
        if(isUserLoggedin(req))
        {
          res.redirect('/');
        }
        else{
          res.render('login')
        }
      });
  
  /* Varify account     /user/login post request*/
  
  const loginFieldsValidation = datalize([field('email', 'E-mail').required().email(),
                                          field('password', 'Password').required().custom(async (value) => {
                                                const regexp = new RegExp("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})");
                                                                        if (!regexp.test(String(value))) {
                                                                    throw new Error('%s must be 6 to 20 characters string with at least one digit, one upper case letter, one lower case letter and one special symbol (“@#$%”)');
                                                      } })
                                            ]);
 
  app.post('/user/login',loginFieldsValidation,(req,res)=>{
   
    if(!req.form.isValid)  {
      res.status(400)
      res.render('login', {
       title:"User Login",
       logout:false,
        message: req.form.errors,
        messageClass: 'alert',
        messageStyle : 'background-color:gray'
        });
     }  
     else{ 
          
         loginVarify(req.body.email,req.body.password).then(function(user){
                 
          setTocken(res,user._id);
          res.locals.user = {id:user._id , name:user.firstName , isAdmin:user.isAdmin}
          res.status(200);
          res.redirect("/");
          }).catch(err=>{
            res.status(500)
            res.locals.user = null;
            res.locals.logout = false;
            res.render('login',{ message: {err},messageStyle : 'background-color:gray'});
        })
      
     }
    
  })

  /* user logout */
  app.get('/user/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.locals.user = null;
    res.redirect("/");
  });
};
