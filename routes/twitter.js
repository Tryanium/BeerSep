var express = require('express');
var router = express.Router();
var passport = require('passport');
const session = require('express-session');
var TwitterStrategy = require('passport-twitter').Strategy;

router.use(session({ secret: 'SECRET' })); // session secret
router.use(session()); // persistent login sessions

var env = require('../twitter-admin.json');

passport.use(new TwitterStrategy({
    consumerKey: env.consumerKey,
    consumerSecret: env.consumerSecret,
    callbackURL: env.callbackURL
  },

  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({
      twitterId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

router.get('/auth/twitter', function(req, res) {
  passport.authenticate('twitter');
  res.send('OKAY');
});

router.get('/index',
  passport.authenticate('twitter', { successRedirect: '/index',
                                     failureRedirect: '/login' }));

module.exports = router;
