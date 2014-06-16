'use strict';

angular.module('main.admin.user', [
    'ui.router',
    'ngResource',
    'userAuth',
    'menus',
    'ui.bootstrap',
    'xeditable'
])

.config(['$stateProvider', 'USER_ROLES',

    function ($stateProvider, USER_ROLES) {

        $stateProvider

        .state('admin.user', {
            url   : '/user',
            views : {
                'admin' : {
                    controller  : 'AdminUserCtrl',
                    templateUrl : 'views/admin/user/user.view.html'
                }
            },
            data  : {
                pageTitle : 'Admin - User'
            }
        });

    }

])

.run(['MenuService', 'USER_ROLES',

    function (MenuService, USER_ROLES) {
        MenuService.addSubMenuItem('Admin', 'User', 'admin.user', false, [USER_ROLES.admin]);
    }

])

// .factory('User', ['$resource',
//
//     function ($resource) {
//         return $resource('/api/admin/user/:id',
//         {
//             id : '@_id'
//         },
//         {
//             update : {
//                 method : 'PUT'
//             }
//         });
//     }
//
// ])

.controller('AdminUserCtrl', ['$scope', '$http', '$modal',

    function ($scope, $http, $modal) {

        $scope.showAddUser = false;

        $scope.addUserFormData = {};

        $scope.users = [];

        $http
        .get('/api/admin/user')
        .then(function (res) {
            $scope.users = res.data;
        });

        $scope.addUser = function () {
            if ($scope.addUserFormData.password != $scope.addUserFormData.passwordConfirm) {
                $scope.passwordConfirmError = true;
            } else {
                $scope.passwordConfirmError = false;
                $http
                .post('/api/admin/user', $scope.addUserFormData)
                .then(function (res) {
                    if (res.data.success) {
                        $scope.addUserFormData = {};
                        $scope.users.push(res.data.user);
                    }
                });
            }
        };

        $scope.updateUser = function(user, prop, value) {
            if (user.hasOwnProperty(prop)) {
                var updateData = {};
                updateData[prop] = value;

                $http
                .put('/api/admin/user/' + user._id, updateData)
                .then(function (res) {
                    return res.data.success;
                });
            }
        };

        $scope.addUserRole = function (user, role) {
            if (role && user.roles.indexOf(role) < 0) {
                var new_roles = user.roles.slice(0);
                new_roles.push(role);
                $http
                .put('/api/admin/user/' + user._id, { roles : new_roles })
                .then(function (res) {
                    if (res.data.success) {
                        user.roles.push(role);
                    }
                });
            }
        };

        $scope.removeUserRole = function (user, role) {
            var index = user.roles.indexOf(role);
            if (index > -1) {
                var new_roles = user.roles.slice(0);
                new_roles.splice(index, 1);
                $http
                .put('/api/admin/user/' + user._id, { roles : new_roles })
                .then(function (res) {
                    if (res.data.success) {
                        user.roles.splice(index, 1);
                    }
                });
            }
        };

        $scope.removeUser = function (user) {
            var confirmation = $modal.open({
                templateUrl : 'views/common/confirmationModal.view.html',
                controller  : ['$scope', '$modalInstance' , function ($scope, $modalInstance) {
                    $scope.message = 'Really remove user ' + user.username + ' ?';
                    $scope.yes = function () { $modalInstance.close(); };
                    $scope.no = function () { $modalInstance.dismiss(); };
                }]
            });

            confirmation.result.then(function () {
                $http
                .delete('/api/admin/user/' + user._id)
                .then(function (res) {
                    if (res.data.success) {
                        var index = 0;
                        for (index = 0; index < $scope.users.length; index++) {
                            if ($scope.users[index]._id == user._id)
                                break;
                        }
                        if (index < $scope.users.length) {
                            $scope.users.splice(index, 1);
                        }
                    }
                });
            });
        };
    }
]);
