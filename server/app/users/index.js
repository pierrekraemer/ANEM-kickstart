'use strict';

module.exports = function () {

	var _ctrl;

	return {

		name : 'users',

		attach : function (options) {
			var user = require('./model')(this.db);
			this.users = {
				model : user.model,
				roles : user.data.roles
			};
		},

		detach : function() {

		},

		init : function (done) {
			var ctrl = require('./controller')(this.users);
			var routes = require('./routes')(ctrl, this.users.roles, this.generateAccessFilter);
			this.loadRoutes(routes, '/api/users');
			return done();
		}

	};

};
