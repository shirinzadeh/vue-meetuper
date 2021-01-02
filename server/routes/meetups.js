const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth')

router.get('', MeetupsCtrl.getMeetups);
//this line must be under getMeetups
/*this code means if user authenticated we can call next function, 
  but if user is not authenticated, this will return response we specfiy in controllers/auth.js */
/**1) secret sehifesine onlyauthuser middleware vasitesile gedirik
  onlyAuthUser-de de we are executing authenticate and jwt strategy(controllers/auth.js COMMENTI OXU)
 */
router.get('/secret', AuthCtrl.onlyAuthUser, MeetupsCtrl.getSecret);
router.get('/:id', MeetupsCtrl.getMeetupById);

router.post('', AuthCtrl.onlyAuthUser, MeetupsCtrl.createMeetup);
router.post('/:id/join', AuthCtrl.onlyAuthUser, MeetupsCtrl.joinMeetup);
router.post('/:id/leave', AuthCtrl.onlyAuthUser, MeetupsCtrl.leaveMeetup);

module.exports = router;
