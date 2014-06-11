'use strict';

angular.module('main.user', [
    'ui.router',
    'userAuth',
    'ui.bootstrap'
])

.config(['$stateProvider', 'USER_ROLES',

    function ($stateProvider, USER_ROLES) {

        $stateProvider

        .state('signin', {
            url         : '/signin',
            views : {
                'main' : {
                    controller  : 'SigninCtrl',
                    templateUrl : 'views/user/signin.view.html'
                }
            },
            data  : {
                pageTitle : 'Signin'
            }
        })

        .state('user', {
            abstract : true,
            url      : '/user',
            views    : {
                'main' : {
                    template : '<div ui-view="user"></div>',
                }
            },
            data     : {
                authorizedRoles : [ USER_ROLES.user ],
                pageTitle       : 'User'
            }
        })

        .state('user.profile', {
            url   : '/profile',
            views : {
                'user' : {
                    controller  : 'ProfileCtrl',
                    templateUrl : 'views/user/profile.view.html'
                }
            },
            data  : {
                pageTitle : 'User - Profile'
            }
        });

    }

])

.controller('SigninCtrl', ['$scope', 'AuthService', '$state', '$rootScope',

    function ($scope, AuthService, $state, $rootScope) {

        $scope.message = '';
        $scope.formData = {};

        $scope.signin = function () {
            AuthService
            .signin($scope.formData)
            .then(function (data) {
                if (!data.success) {
                    $scope.message = data.message;
                } else {
                    $state.go($rootScope._toState, $rootScope._toParams);
                }
            });
        };
    }
])

.controller('ProfileCtrl', ['$scope',

    function ($scope) {
        $scope.user = $scope.currentUser();
    }

]);
