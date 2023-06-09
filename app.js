var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
  function(username, password, done) {
    Account.findOne( {username: username }
      .then(function(user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch(function(err) {
      return done(err)
    })
  )})
)

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error.'));
db.once("open", function() {
  console.log("Connection to DB succeeded")
});

const Gem = require("./models/gems")

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Gem.deleteMany()

  let instance1 = new Gem({name: "ruby", color: "red", hardness: 9});
  instance1.save()
    .then(function (instance1) {
      console.log(instance1)
    })
    .catch(function (err) {
      console.log(err)
    }) 

  let instance2 = new Gem({name: "sapphire", color: "blue", hardness: 9});
  instance2.save()
    .then(function (instance2) {
      console.log(instance2)
    })
    .catch(function (err) {
      console.log(err)
    })
  
  let instance3 = new Gem({name: "emerald", color: "green", hardness: 7.5});
  instance3.save()
    .then(function (instance3) {
      console.log(instance3)
    })
    .catch(function (err) {
      console.log(err)
    })

}
let reseed = true;
if (reseed) { recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gemsRouter = require('./routes/gems');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gems', gemsRouter);
app.use('/board', boardRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new localStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
