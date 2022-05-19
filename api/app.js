var createError = require('http-errors');
var mongoose = require('mongoose');
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
const { allowedNodeEnvironmentFlags } = require('process');

var app = express();

var User = require("./user");

let user = {};

mongoose.connect("mongodb+srv://jinxxur:Tores999abcq@cluster0.lphpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {  
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err)=>{
    if(err) console.log(err);
    else{
      console.log("Mongoose is Connected");
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser("secretcode"))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);



app.use('/', indexRouter);

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        blocked: false,
        admin: false,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.all('/login', (req,res,next) =>{
  passport.authenticate("local", (err, user, info)=>{
    if(err) throw err;
    if(!user) res.send("No User Exists");
    else{
      req.logIn(user, err=>{
        if(err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
        //res.redirect("/profile");
      })
    }
  })(req,res,next);
});

app.get('/user', checkAuthentication, (req,res) =>{
  res.send(req.user);
});

app.get('/logout', (req,res) => {
  req.logout();
  user = {};
  res.redirect('/');
});

app.get('/auth', checkAuthentication, (req,res) => {
  res.send('true');
});



function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect("/login");
  }
}


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
