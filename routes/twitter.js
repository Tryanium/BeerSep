var express = require('express');
var router = express.Router();
var passport = require('passport');

require('dotenv').config();
var TwitterStrategy = require('passport-twitter').Strategy;

const Da = require("./../data-access/UserDA.ts");

var db = new Da();

router.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

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

router.get('/oauth/callback', function(req, res, next) {
  passport.authenticate('twitter', {
    successRedirect: '/twitter/connecte',
    failureRedirect: '/'
  })(req, res, next);
});


router.get('/connecte', function(req, res) {
  //console.log(req.user);
  if (req.user) {
    let id = req.user.id;
    let img = req.user.photos[0].value;
    checkIfIndB(id, req.user.displayName);
    res.send("Hello " + req.user.displayName + "<img src='" + img + "' >");
  } else {
    res.redirect('/');
  }
});

function checkIfIndB(UsrId, DisplayName) {
  let usr = db.getUser(UsrId);
  if(usr === null) {
    db.addUser(UsrId, DisplayName);
  }
  else {
    console.log(usr);
  }
}

module.exports = router;
