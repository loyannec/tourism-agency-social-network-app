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

    /*
    Display respective user profile page
    */
    app.get('/user/profile/:id', (req, res) => {
        res.render('profile');
    });
};
