const Thread = require('../models/threads');

exports.getThreads = function (req, res) {
  const meetupId = req.query.meetupId;

  Thread.find({})
    .where({ 'meetup': meetupId })
    .populate({
      path: 'posts',
      options: { limit: 5, sort: { 'createdAt': -1 } },
      populate: { path: 'user' }
    })
    .exec((errors, threads) => {

      if (errors) {
        return res.status(422).send({ errors });
      }

      return res.json(threads);
    });
}

exports.createThread = function (req, res) {
  //threadData is title and meetupId. thats wht we're sending from client
  const threadData = req.body
  //created new instance of Thread with threadData
  const thread = new Thread(threadData)
  //add thread a user. so we know which user created this thread
  thread.user = req.user

  //save thread to db
  thread.save((errors, createdThread) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(createdThread)
  });
}