'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var favicon    = require('serve-favicon');
var logger     = require('morgan');

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

			_app.use(bodyParser.json());

			_app.all('*', function (req, res, next) {
				res.set('Access-Control-Allow-Origin', 'http://localhost');
				res.set('Access-Control-Allow-Credentials', true);
				res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
				res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
				if (req.method == 'OPTIONS') {
					return res.send(200);
				}
				next();
			});

			this.on('allPluginsInitDone', function () {
				_app.all('/*', function (req, res) {
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
