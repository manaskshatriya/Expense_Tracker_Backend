require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const userRouter = require("./routes/userRouter/user.router");
const expenseRouter = require("./routes/expenseRouter/expense.router");

const passport = require('passport');


app.use(express.json());
app.use("/api/", userRouter);
app.use("/api/expense", expenseRouter);

//auth
const path = require('path');
const session = require("express-session");
require('./controllers/auth/auth');


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


app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success', (req, res) => {

  res.json(req.user)
}); 

app.get('/auth/google/failure', isLoggedIn ,  (req, res) => {
  res.send('failure')
});

app.use('/auth/logout', (req, res) => {
  req.session.destroy();
  console.log('logged out');
  res.redirect('/');
})


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
      console.log(`MongoDB connected...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();