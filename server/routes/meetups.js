const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth')

router.get('', MeetupsCtrl.getMeetups);
//this line must be under getMeetups
/*this code means if user authenticated we can call next function, 
  but if user is not authenticated, this will return response we specfiy in controllers/auth.js */
router.get('/secret', AuthCtrl.onlyAuthUser, MeetupsCtrl.getSecret);

router.get('/:id', MeetupsCtrl.getMeetupById);

module.exports = router;
