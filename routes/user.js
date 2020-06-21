const User = require("../db/models/user");
const crypto = require("crypto");

function getHashedPassword(password) {
    return crypto.createHash("sha256")
        .update(password)
        .digest("hex");
}

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

    app.post('/user/register', (req, res) => {
        var user = new User(req.body);
        user.password = getHashedPassword(user.password);
        user.save(function (err, result) {
            if (err) throw err;
            res.redirect("/user/login");
        });
    });

    /*
    Display respective user profile page
    */
    app.get('/user/:id', (req, res) => {
        var {id} = req.params; 
        var query = User.findOne({_id: id}).lean();
        query.exec(function (err, user) {
            console.log(user);
            res.render('profile', { user });
        });
    });

    app.get('/myaccount', (req, res)=>{
        var find = { email:"email@email.com" };
        var query = User.findOne(find).lean();
        query.exec(function (err, user) {
            console.log(user);
            res.render('myaccount', { user });
        });
    });

    app.post('/myaccount', (req, res)=>{
        var id = { _id: req.body.id };
        var newPassword = getHashedPassword(req.body.password);
        var update = { password: newPassword };
        User.findOneAndUpdate(id, update, () => {
            res.redirect('/');
        });
    });
};
