const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../models/User/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id , name: profile.displayName , email: profile.email , image : profile.picture})
            .save()
            .then((user) => done(null, user));
        }
      });

      // User.find({ googleId: profile.id ,  }, function (err, user) {
      //   return done(err, user);
      // });
      // done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try { // Retrieve user object from the database using the user ID
    done(null, user); // Deserialized user object is provided to the request object as req.user
  } catch (error) {
    done(error, false);
  }
});
