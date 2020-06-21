const hash = require("../helpers/hash");
const auth = require("./auth");
const User = require("../db/models/user");

module.exports = (app) => {
    /*
    Display respective login page
    */
    app.get('/user/login', (req, res) => {
        res.render('user/login');
    });

    app.post('/user/login', (req, res, next) => {
        const email = req.body.email;
        const password = hash(req.body.password);
        User.findOne({ email, password }, (err, user) => {
            if (err || !user) {
                res.render('user/login', { message: 'Invalid user or password' });
                return;
            }
            req.user = user;
            next();
        });
    }, auth.setToken);

    /*
    Display user register page
    */
    app.get('/user/register', (req, res) => {
        res.render('user/register');
    });

    app.post('/user/register', (req, res, next) => {
        var user = new User(req.body);
        user.password = hash(user.password);
        user.save(function (err) {
            if (err) {
                res.render('user/register', { message: 'User email already exists' });
                return;
            }
            req.user = user;
            next();
        });
    }, auth.setToken);

    app.get('/user/logout', auth.unsetToken, (req, res) => {
        res.redirect('/');
    });

    /*
    Display respective user profile page
    */
    app.get('/user/:id', auth.verifyToken, (req, res) => {
        res.render('user/profile', { user: req.user });
    });

    app.get('/myaccount', auth.verifyToken, (req, res)=>{
        var find = { email:"email@email.com" };
        var query = User.findOne(find).lean();
        query.exec(function (err, user) {
            res.render('user/myaccount', { user });
        });
    });

    app.post('/myaccount', auth.verifyToken, (req, res)=>{
        var id = { _id: req.body.id };
        var newPassword = hash(req.body.password);
        var update = { password: newPassword };
        User.findOneAndUpdate(id, update, () => {
            res.redirect('/');
        });
    });
};
