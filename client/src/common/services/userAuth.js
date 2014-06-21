'use strict';

angular.module('userAuth', [])

.constant('USER_ROLES', {
    user  : 'user',
    admin : 'admin'
})

.factory('AuthService', [ '$http',

    function ($http) {

        var _user = null;

        return {

            signin : function (credentials) {
                return $http
                .post('/api/users/signin', credentials)
                .then(function (res) {
                    if (res.data.success) {
                        _user = res.data.user;
                    }
                    return res.data;
                });
            },

            signout : function () {
                return $http
                .get('/api/users/signout')
                .then(function (res) {
                    _user = null;
                    return res.data;
                });
            },

            currentUser : function () {
                return _user;
            },

            tryRemoteAuth : function () {
                return $http
                .get('/api/users/signedin')
                .then(function (res) {
                    if (res.data.success) {
                        _user = res.data.user;
                        return true;
                    } else {
                        _user = null;
                        return false;
                    }
                });
            },

            isAuthenticated : function () {
                return _user !== null;
            },

            isAuthorized : function (authorizedRoles) {
                if (this.isAuthenticated()) {
                    for (var i = 0; i < _user.roles.length; i++) {
                        if (authorizedRoles.indexOf(_user.roles[i]) > -1) {
                            return true;
                        }
                    }
                }
                return false;
            }

        };
    }
])

;
