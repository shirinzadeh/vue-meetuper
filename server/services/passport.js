const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');

//this code is excecuded before session is stored inside of mongodb
//we will get user object(function(user)) and user id from user object(user.id)
passport.serializeUser(function (user, done) {
  //null for error. if we dont have error save session with user.id
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  /*first we are serializing user, we are providing id, but when user is authenticated in our session,
  we want to get session and user object from db*/
  //that is mongose related function. Here is user object and we find byuserid
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

/* *******************
3.USE PASSPORT AUTHENTICATION
4.FIND USER AND CHECK IF USER IN DB (evveli controllers/users.js-de)
*******************/
//define localstrategy
passport.use(new LocalStrategy({
  //specify email and password field we are sending in request
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  /*we will get password and email we are sending with this request
  first we want to find a user in db. if this user exists. we make sure if this user authenticated*/
  User.findOne({ email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }
    //comparePassword function is called in models/users.js
    user.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false) }

      //when done() is executed, this will execute callback function inside login. (passport.athenticate() controllers/users.js)
      return done(null, user)
    })
  })
}))