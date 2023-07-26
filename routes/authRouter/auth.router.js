require("dotenv").config();
const express = require("express");
const app = express();
const passport = require('passport');
const path = require('path');
const session = require("express-session");
require('../../controllers/auth/auth');


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());


function isLoggedIn(req,res,next){
  req.user ? next() : res.status(401).send('Unauthorized')
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/google/success', (req, res) => {
  res.json(req.user)

}); 

app.get('/google/failure', isLoggedIn ,  (req, res) => {
  res.send('failure')
});

app.use('/logout', (req, res) => {
  req.session.destroy();
  console.log('logged out');
  res.redirect('/');
})

module.exports = app;