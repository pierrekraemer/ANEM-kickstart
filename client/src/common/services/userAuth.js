'use strict';

angular.module('userAuth', [])

.constant('USER_ROLES', {
    user  : 'user',
    admin : 'admin'
})

.factory('AuthService', [ '$http', '$window',

    function ($http, $window) {

        var _user = null;
        var _userRoles = {};

        return {

            getRoles : function () {
                return $http
                .get('/api/users/roles')
                .then(function (res) {
                    _userRoles = res.data;
                });
            },

            userRoles : function () {
                return _userRoles;
            },

            signin : function (credentials) {
                return $http
                .post('/api/users/signin', credentials)
                .then(function (res) {
                    if (res.data.success) {
                        $window.sessionStorage.token = res.data.token;
                        _user = res.data.user;
                    }
                    return res.data;
                });
            },

            signout : function () {
                return $http
                .get('/api/users/signout')
                .then(function (res) {
                    delete $window.sessionStorage.token;
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
