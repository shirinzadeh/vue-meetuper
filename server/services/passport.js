const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');
const config = require('../config/dev');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Only For Session Authentication !

//this code is excecuded before session is stored inside of mongodb
//we will get user object(function(user)) and user id from user object(user.id)
// passport.serializeUser(function (user, done) {
//   //null for error. if we dont have error save session with user.id
//   done(null, user.id)
// })

// Only For Session Authentication !

// passport.deserializeUser(function (id, done) {
//   /*first we are serializing user, we are providing id, but when user is authenticated in our session,
//   we want to get session and user object from db*/
//   //that is mongose related function. Here is user object and we find byuserid
//   User.findById(id, function (err, user) {
//     done(err, user)
//   })
// })

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

/** JWT, melumatlari "token": icerisinde encrypt edib yazir(random reqem ve herf kimi gorunur)
 * User login olanda melumatlari servere gedende token seklinde yeniden klente terefe qaytaririq
 * secret sehifesi ancaq login olan user ucun gorsenmeli olduguna gore, postmanda Headers-de authorization key elave edib,
    value hissesine login olanda userin tokene cevrilmis formada olan melumatini daxil edirik.
    when we are logged in we are getting token with our user object. in application we store token in local storage.
     */
/** bu kod tokeni avtomatik olaraq bizim ucun decode edir */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET
};

/** 3) payloadda user id ve token ve bezi informasiyalar var */
passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
  /** normalda id melumatina _id yazaraq catiriq. amma payload._id yox .id yazmisiq. cunki
   models/users-de generateJWT icerisinde jwt.sign() ile id: this._id bu kodu yaziriq
   */
  User.findById(payload.id, function (err, user) {
    if (err) { return done(err, false) }

    if (user) {
      done(null, user);
    } else {
      done(null, false)
    }
  });
}));