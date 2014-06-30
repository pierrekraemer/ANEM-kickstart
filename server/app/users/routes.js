'use strict';

module.exports = function (Ctrl, userRoles, generateAccessFilter) {

	return [

		{
			checkAuthorizationToken : false,
			accessControl : 'public',
			routes : [
				{ verb : 'get', url : '/roles', func : Ctrl.getRoles },
				{ verb : 'post', url : '/signin', func : Ctrl.signin }
			]
		},

		{
			checkAuthorizationToken : true,
			accessControl : generateAccessFilter([ userRoles.user ]),
			routes : [
				// { verb : 'get', url : '/signout', func : Ctrl.signout },
				{ verb : 'get', url : '/whoami', func : Ctrl.whoami }
			]
		},

		{
			checkAuthorizationToken : true,
			accessControl : generateAccessFilter([ userRoles.admin ]),
			routes : [
				{ verb : 'get', url : '/', func : Ctrl.getAll },
				{ verb : 'get', url : '/count', func : Ctrl.count },
				{ verb : 'get', url : '/:nbPerPage/:currentPage', func : Ctrl.getPage },
				{ verb : 'get', url : '/:id', func : Ctrl.getById },

				{ verb : 'post', url : '/', func : Ctrl.create },

				{ verb : 'put', url : '/:id', func : Ctrl.update },

				{ verb : 'delete', url : '/:id', func : Ctrl.delete }
			]
		}

	];

};
