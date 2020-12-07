const passport = require('passport')
const User = require('../models/users');

exports.getUsers = function (req, res) {
  User.find({})
    .exec((errors, users) => {
      if (errors) {
        return res.status(422).send({ errors });
      }
      return res.json(users);
    });
}

exports.register = function (req, res) {
  const registerData = req.body

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }
  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation password'
      }
    })
  }

  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({ errors })
    }

    return res.json(savedUser)
  })
}

/* ************
2. CHECK LOGIN CREDENTIALS (davamı passport.js-də)
***************/
exports.login = function (req, res, next) {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }
  //local method is authentication with email and password
  //in callback we get an error or logged user
  //local is localstrategy
  //(err, passportUser) => { .... } is done() function(passport.js)
  return passport.authenticate('local', (err, passportUser) => {
    //if we have error call next middleware, so next function
    if (err) {
      return next(err)
    }

    if (passportUser) {
      /*we have login() function thanks to passport. 
      After register passport.initialize() and passport.session() in index.js, login() is availabed*/
      //this will execute serialize function. we will get inside serialize(passport.js)
      req.login(passportUser, function (err) {
        if (err) { next(err); }

        return res.json(passportUser)
      });
    } else {
      return res.status(422).send({
        errors: {
          'authentication': 'Ooops, something went wrong!'
        }
      })
    }
  })(req, res, next)
  /* 
  SAME CODE :
  const auth = passort.authenticate(.....){}
  auth(req,res,next) 
  
  function animals(dog) {
    console.log(dog)
  } 
  animals()('Rex') ---it will console Rex  */
}
