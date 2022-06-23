const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const fileUpload= require('express-fileupload')
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const organizationRouter = require('./routes/organizations.routes');
const testimonialsRouter = require('./routes/testimonials.routes');
const newsRouter = require('./routes/news');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth')
const membersRouter = require('./routes/members')
const rolesRouter = require('./routes/role');
const activitiesRouter = require('./routes/activities');
const slidesRouter = require('./routes/slides');
const uploadRouter = require('./routes/upload')
const contactRoutes = require('./routes/contacts.routes')

const app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir : '/tmp/',
  debug: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/organization', organizationRouter);
app.use('/testimonials',testimonialsRouter)
app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/members', membersRouter )
app.use('/roles', rolesRouter);
app.use('/activities', activitiesRouter);
app.use('/slides', slidesRouter);
app.use('/upload', uploadRouter)
app.use('/contacts',contactRoutes)

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
