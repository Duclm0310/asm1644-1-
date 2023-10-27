var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/cars');
var gundamsRouter = require('./routes/gundams'); 


var app = express();
//so sanh text
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))


// cai dat body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// cai dat mongoose
var mongoose = require("mongoose");
var uri = "mongodb+srv://duclmgch211370:leduc0310@cluster0.0nmhrw9.mongodb.net/ASM1644";
mongoose.connect(uri)
.then(() => console.log ("Connect to DB succeed!"))
.catch((err) => console.log (err));

// khai bao cai dat thu vien Date
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/gundams', gundamsRouter);


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

app.listen(process.env.PORT||3001)


module.exports = app;
