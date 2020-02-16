var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/addstudent');
 var usersRouter = require('./routes/addusers')
var app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/tunica', {useNewUrlParser: true}).then(
   db =>  {
     console.log('Connected to server');
   }, err =>  {
     console.log('Could not connect to db');
   }
 );

app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
