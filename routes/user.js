var userModel = require("../db/model/users");
const { getHashedPassword } = require("../routes/auth");

module.exports = (app) => {
    /*
    Display respective login page
    */
    app.get('/user/login', (req, res) => {
        res.render('login');
    });

    /*
    Display user register page
    */
    app.get('/user/register', (req, res) => {
        res.render('register');
    });

    app.post('/user/register', (req,res)=>{
        var user = new userModel();
        user.firstName = req.body.firstname;
        user.lastName = req.body.surname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.isAdmin = false;
          
        if(req.body.password != req.body.confirm){
            res.render("register",{message:"Passwords do not match"});
        }
        else{
            user.password = getHashedPassword(user.password);
            user.save(function (err, result) {
                if (err) return console.error(err);
                console.log("Saved!!");
                res.redirect("/login");
            });
        }
    });

    /*
    Display respective user profile page
    */
    app.get('/user/profile/:id', (req, res) => {
        res.render('profile');
    });

    app.get('/myaccount', (req,res)=>{
        var find = {email:"email@email.com"};
        var query = userModel.findOne(find).lean();
        query.exec(function (err, user) {
            res.render('myaccount', {user});
        });
    });

    app.post('/myaccount',(req,res)=>{
        var id = { _id: req.body.id };
        var newPassword = getHashedPassword(req.body.password);
        var update = { password: newPassword };
        var query = userModel.findOneAndUpdate(id, update,(err,result)=>{
            res.redirect('/');
        }); 
    });
};
