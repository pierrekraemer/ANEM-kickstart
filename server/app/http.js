'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var methodOverride = require('method-override');
var favicon        = require('serve-favicon');
var logger         = require('morgan');

module.exports = function () {

	var _publicPath;
	var _app = express();
	var _router = express.Router;

	return {

		name : 'http',

		attach : function (options) {
			this.http = {
				app : _app,
				router : _router
			};

			_publicPath = options.publicPath;

			_app.use(favicon(_publicPath + '/assets/favicon.ico'));
			_app.use(express.static(_publicPath));

			_app.use(logger('dev'));

			_app.use(cookieParser());
			_app.use(bodyParser());

			_app.use(methodOverride());

			_app.use(session({
				secret: 'thisismysecret',
				cookie: { maxAge: (86400 * 1000) } // 24h
			}));

			this.on('load', function () {
				_app.all('/*', function(req, res) {
					res.sendfile(_publicPath + '/index.html');
				});

				var server = _app.listen(3000, function () {
					console.log('Listening on port ' + server.address().port);
				});
			});
		},

		detach : function() {

		},

		init : function (done) {
			return done();
		}

	};

};
