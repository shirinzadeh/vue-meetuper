const passport = require('passport')

// Only for session AUTH!

// Auth Middleware
//onlyAuthUser is checking if our user is autheticated
// exports.onlyAuthUser = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     /** burda next function yazmaqda sebeb, if user authenticated routes/meetups.js-daki /secret get eden routerde 
//         novbeti function cagirir. Bu function da getSectetdi */
//     return next()
//   }

//   return res.status(401).send({ errors: { auth: 'Not Authenticated!' } })
// }

/** 2) BURDA JWT STRATEGY passport.js-de passport.use(new JwtStrategy(jwtOptions, function (payload, done) EXECUTE EDIR
 *  PASSPORT.JS-DE COMMENTI OXU
*/
exports.onlyAuthUser = passport.authenticate('jwt', { session: false })
