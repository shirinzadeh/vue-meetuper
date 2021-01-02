const Meetup = require('../models/meetups');
const User = require('../models/users');

exports.getSecret = function (req, res) {
  return res.json({ secret: 'I am secret Message' })
}

exports.getMeetups = function (req, res) {
  Meetup.find({})
    .populate('category')
    .populate('joinedPeople')
    .exec((errors, meetups) => {

      if (errors) {
        return res.status(422).send({ errors });
      }

      return res.json(meetups);
    });
}

exports.getMeetupById = function (req, res) {
  const { id } = req.params;

  Meetup.findById(id)
    .populate('meetupCreator', 'name id avatar')
    .populate('category')
    .populate({
      path: 'joinedPeople',
      options: { limit: 5, sort: { username: -1 } }
    })
    .exec((errors, meetup) => {
      if (errors) {
        return res.status(422).send({ errors });
      }

      return res.json(meetup);
    });
}

exports.createMeetup = function (req, res) {
  const meetupData = req.body;
  const user = req.user;

  const meetup = new Meetup(meetupData);
  meetup.user = user;
  meetup.status = 'active';

  meetup.save((errors, createdMeetup) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(createdMeetup)
  })
}

exports.joinMeetup = function (req, res) {
  //we get user who wants to join meetup
  const user = req.user;
  //this is meetup id we get from req which we want to join 
  const { id } = req.params;

  //looking for this meetup in db
  //if meetup found we get it in callback function
  Meetup.findById(id, (errors, meetup) => {
    if (errors) {
      return res.status(422).send({ errors })
    }

    //meetup-a join etmek isteyen useri joinedPeople-a push edirik
    meetup.joinedPeople.push(user);
    meetup.joinedPeopleCount++;

    return Promise.all(
      //saving meetup to db
      [meetup.save(),
      //updating user. join olan meetupi joinedmeetupsa elave edir db-da
      User.updateOne({ _id: user.id }, { $push: { joinedMeetups: meetup } })])
      .then(result => res.json({ id }))
      .catch(errors => res.status(422).send({ errors }))
  })
}

/** joinMeetup-in eksidir. onda push edirik, bunda da pull */
exports.leaveMeetup = function (req, res) {
  const user = req.user;
  const { id } = req.params;

  Promise.all(
    //$inc -1 means decrement
    [Meetup.updateOne({ _id: id }, { $pull: { joinedPeople: user.id }, $inc: { joinedPeopleCount: -1 } }),
    User.updateOne({ _id: user.id }, { $pull: { joinedMeetups: id } })])
    .then(result => res.json({ id }))
    .catch(errors => res.status(422).send({ errors }))
}
