'use strict';

var passport = require('passport');

module.exports = function () {

	var _user,
		_ctrl,
		_routes;

	return {

		name : 'users',

		attach : function (options) {
			_user = require('./model')(this.db);
			_ctrl = require('./controller')(_user);
			_routes = require('./routes')(_ctrl, _user.data.roles);

		    require('./passport')(passport, _user.model);

			this.users = {
				roles : _user.data.roles
			};

			this.http.app.use(passport.initialize());
			this.http.app.use(passport.session());
		},

		detach : function() {

		},

		init : function (done) {
			for (var i = 0; i < _routes.length; i++) {
				var router = this.http.router();
				var routesGroup = _routes[i];
				if (routesGroup.accessControl !== 'public') {
					router.use(routesGroup.accessControl);
				}
				for (var j = 0; j < routesGroup.routes.length; j++) {
					var route = routesGroup.routes[j];
					switch (route.verb) {
						case 'get'    : router.get(route.url, route.fun); break;
						case 'post'   : router.post(route.url, route.fun); break;
						case 'put'    : router.put(route.url, route.fun); break;
						case 'delete' : router.delete(route.url, route.fun); break;
					}
				}
				this.http.app.use('/api/users', router);
			}
			return done();
		}

	};

};
