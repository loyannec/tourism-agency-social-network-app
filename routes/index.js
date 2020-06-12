module.exports = (app) {
const express = require

/*
GET home page.
*/
app.get('/');

/*
Display search location
*/
app.get('/filterlocation');

/*
Log out user and display login page.
*/
app.get('/logout');

/*
Display respective Agency Page
*/
app.get('/gdfgf/:id');

/*
Display Register page
*/
app.get('/register');

/*
Submits User details
*/
app.post('/register');

/*
Display search by locations
*/
app.get('/searchjdjdjdj');

/*
Display respective Agency Page
*/
app.post('/reviews');
};
