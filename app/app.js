// Including modules comes here
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conf = require('./config.js');

var routes = require('./routes/index');
var rowsets = require('./routes/rowsets');

// Our app begins here (Express Server)
var app = express();

// View engine setup, commonly used Jade
app.set('view engine', 'jade');

// Views directory
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// The static files contains in public directory become available at /static/
// requests.
app.use('/static', express.static(path.join(__dirname, 'public')));


// Top-level routings.
app.use('/', routes);
app.use('/rowsets', rowsets);

// Handler for 404 status response. This middleware occures when nobody gave an
// answer for the request.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler will print stacktrace.
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler no stacktraces leaked to user.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
