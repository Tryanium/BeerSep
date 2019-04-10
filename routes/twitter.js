var express = require('express');
var router = express.Router();
var passport = require('passport');

require('dotenv').config();
var TwitterStrategy = require('passport-twitter').Strategy;

router.use(require('express-session')({ secret: 'keyboard cat',resave: false, saveUninitialized: true}));

router.use(passport.initialize());
router.use(passport.session());


passport.use(new TwitterStrategy({
    consumerKey: process.env.TwitterConsumerKey,
    consumerSecret: process.env.TwitterConsumerSecret,
    callbackURL: process.env.TwitterCallbackURL
  },

  function(token, tokenSecret, profile, cb) {
      // In this example, the user's Twitter profile is supplied as the user
      // record.  In a production-quality application, the Twitter profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.get('/oauth/callback', function (req, res) {
  passport.authenticate('twitter', { successRedirect: '/twitter/connecte',
                                     failureRedirect: '/'
                                   }) (req,res);
});


router.get('/connecte', function (req,res) {
  if(req.user) {
    res.send("Hello " + req.user.displayName);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
