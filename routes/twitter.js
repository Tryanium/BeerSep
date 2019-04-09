var express = require('express');
var router = express.Router();
var passport = require('passport');

var TwitterStrategy = require('passport-twitter').Strategy;

router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

router.use(passport.initialize());
router.use(passport.session());

var env = require('../twitter-admin.json');

passport.use(new TwitterStrategy({
    consumerKey: env.consumerKey,
    consumerSecret: env.consumerSecret,
    callbackURL: env.callbackURL
  },

  function(token, tokenSecret, profile, cb) {
    console.log(profile);
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


router.get('/auth/twitter', function(req, res) {
  passport.authenticate('twitter');
});

router.get('/oauth/callback',
  passport.authenticate('twitter', { successRedirect: '/twitter/connecte',
                                     failureRedirect: '/login' }));

router.get('/connecte', function (req,res) {
  res.send("I'm CONNECTED");
});

module.exports = router;
