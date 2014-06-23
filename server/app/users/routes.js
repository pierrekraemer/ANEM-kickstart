'use strict';

module.exports = function (Ctrl, Users) {

	return [

		{
			accessControl : 'public',
			routes : [
				{ verb : 'post', url : '/signin', fun : Ctrl.signin },
				{ verb : 'get', url : '/signout', fun : Ctrl.signout },
				{ verb : 'get', url : '/signedin', fun : Ctrl.signedin }
			]
		},

		{
			accessControl : Users.filterAccess([ Users.roles.admin ]),
			routes : [
				{ verb : 'get', url : '/', fun : Ctrl.getAll },
				{ verb : 'get', url : '/count', fun : Ctrl.count },
				{ verb : 'get', url : '/:nbPerPage/:currentPage', fun : Ctrl.getPage },
				{ verb : 'get', url : '/:id', fun : Ctrl.getById },

				{ verb : 'post', url : '/', fun : Ctrl.create },

				{ verb : 'put', url : '/:id', fun : Ctrl.update },

				{ verb : 'delete', url : '/:id', fun : Ctrl.delete }
			]
		}

	];

};
