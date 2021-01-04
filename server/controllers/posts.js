const Thread = require('../models/threads');
const Post = require('../models/posts');

exports.getPosts = function (req, res) {
  const threadId = req.query.threadId;

  Post.find({ 'thread': threadId })
    .populate('user')
    .exec((errors, posts) => {

      if (errors) {
        return res.status(422).send({ errors });
      }

      return res.json(posts);
    });
}

exports.createPost = function (req, res) {
  //getting postData from request we are sending from vue application
  const postData = req.body
  //creating post instance with post data
  const post = new Post(postData)
  //assigning user to post who created this post
  //every post has a user.so we know which user created this post(models/posts)
  post.user = req.user

  post.save((errors, createdPost) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    //in succesful attempt we need to update thread
    Thread.update({ _id: createdPost.thread }, { $push: { posts: createdPost } }, () => { })
    return res.json(createdPost)
  });
}
