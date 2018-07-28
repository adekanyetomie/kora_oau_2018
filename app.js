const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const session = require('express-session');
const flash = require('express-flash');

const indexRouter = require('./routes/index.rout');
const ussdRouter = require('./routes/ussd.rout');

require('dotenv').config();
const app = express();

app.use(helmet());
app.use(logger('dev'));

//Parsing the body on each request and giving access to data sent
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(cors());
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname, '/public')));
//Routes
app.use('/', indexRouter);
app.use('/ussd/', ussdRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

console.log('App listening on ', process.env.PORT);

module.exports = app;