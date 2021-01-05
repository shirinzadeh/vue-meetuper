const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');


const session = require('express-session');
const passport = require('passport');

// Only For Session Authentication !
//we need to prove express-session inside of mongodb-session adding (session)function
// const MongoDBStore = require('connect-mongodb-session')(session);

// const store = new MongoDBStore({
//   uri: config.DB_URI,
//   collection: 'meetuperSessions'
// })

// store.on('error', (error) => console.log(error))

require("./models/meetups");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categories");

require("./services/passport");

const meetupsRoutes = require('./routes/meetups'),
  usersRoutes = require('./routes/users'),
  threadsRoutes = require('./routes/threads'),
  postsRoutes = require('./routes/posts'),
  categoriesRoutes = require('./routes/categories');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

const app = express();
//create server inside application
const server = require('http').createServer(app)
//when server don't get response in 60seconds, the connection will bi considered as a fail and connection will be closed
//when connection 
const io = require('socket.io')(server, { pingTimeout: 60000 })

/**socket/index-e kecirdik */
//listen to connection
// io.on('connection', function (socket) {
//   console.log('connection has been established')
// })

//passing io instance to our socket/index.js file
require('./socket')(io)

app.use(bodyParser.json());

// Only For Session Authentication !

//specify new middleware
//we can register middleware with app.use(). We are notifying server to check for session 
//secret is just random string according to wht you encode your section. Needs to be smth unique. That's why we create SESSION_SECRET in config
//cookie will be storing inside of client browser
// app.use(session({
//   secret: config.SESSION_SECRET,
//   cookie: { maxAge: 3600000 },
//   resave: false,
//   saveUninitialized: false,
//   store
// }))

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, function () {
  console.log('App is running on port: ' + PORT);
});
