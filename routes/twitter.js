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
  console.log(req.user);
  if (req.user) {
    let id = req.user.id;
    let img = req.user.photos[0].value;
    checkIfIndB(req.user);
    let data = {};
    data.userName = req.user.displayName;
    data.userID = id;
    data.userImg = img;
    console.log(data);
    res.send(data);
  } else {
    res.redirect('/');
  }
});


function checkIfIndB(TwitterProfil) {
   var usr = db.getUser(TwitterProfil, function (data) {
     if(data === null) {
       db.addUser(TwitterProfil);
     }
     else {
       console.log(data);
     }
   });
}

module.exports = router;
