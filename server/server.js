'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var methodOverride = require('method-override');
var favicon        = require('serve-favicon');
var mongoose       = require('mongoose');
var passport       = require('passport');
var logger         = require('morgan');
var path           = require('path');

var app = express();

var publicPath = path.resolve('../public/');

var db = require('./db')(mongoose);
db.connect();

require('./config')(app,
                    express,
                    bodyParser,
                    cookieParser,
                    session,
                    methodOverride,
                    favicon,
                    db.models,
                    passport,
                    logger,
                    publicPath);

var controllers = require('./controllers')(db.models,
                                           passport);

require('./routes')(app,
                    express,
                    controllers,
                    publicPath);

var server = app.listen(3000, function () {
    console.log('Listening on port ' + server.address().port);
});
