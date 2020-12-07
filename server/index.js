const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');


const session = require('express-session');
const passport = require('passport');
//we need to prove express-session inside of mongodb-session adding (session)function
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: config.DB_URI,
  collection: 'meetuperSessions'
})

store.on('error', (error) => console.log(error))

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

app.use(bodyParser.json());

//specify new middleware
//we can register middleware with app.use(). We are notifying server to check for session 
//secret is just random string according to wht you encode your section. Needs to be smth unique. That's why we create SESSION_SECRET in config
//cookie will be storing inside of client browser
app.use(session({
  secret: config.SESSION_SECRET,
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log('App is running on port: ' + PORT);
});
