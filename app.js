var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors'); //add cors
var session = require('express-session');
var flash = require('express-flash')


//routes
var user_api = require('./routes/users_api');
var indexRouter = require('./routes/index');
var customers = require('./routes/customers');
var customers_api = require('./routes/customers_api');
var git_rest = require('./routes/git_api');


var app = express();
var config = require('./config')
var myConnection   = require('express-myconnection');
var mysql = require('mysql');

//setup database
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}

//session
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(myConnection(mysql, dbOptions, 'pool'))
app.use(expressValidator());
app.use(logger('dev'));
app.use(cors()); //add cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //false ==> true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


//routes logic
app.use('/', indexRouter);
app.use('/api/v1', user_api);
app.use('/customers', customers);
app.use(customers_api);
app.use('/git_api', git_rest);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;