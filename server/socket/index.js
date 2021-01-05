module.exports = function (io) {
  io.on('connection', function (socket) {
    console.log('connection has been established')

    //subscribing to an event
    // This is comming from our client
    // -->here we're catching this event and we are getting our post
    /**PostCreate-de emit edilir */
    socket.on('meetup/postSave', function (post) {
      // This is going to our clients
      //-->And we are emitting from server to client.so we need to listen postPublshed on client side
      io.emit('meetup/postPublished', post)
    })

  })
}