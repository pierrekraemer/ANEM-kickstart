'use strict';

angular.module('main.admin.users', [
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

        .state('admin.users', {
            url   : '/users',
            views : {
                'admin' : {
                    controller  : 'AdminUserCtrl',
                    templateUrl : 'views/admin/users/users.view.html'
                }
            },
            data  : {
                pageTitle : 'Admin - Users'
            }
        });

    }

])

.run(['MenuService', 'USER_ROLES',

    function (MenuService, USER_ROLES) {
        MenuService.addSubMenuItem('Admin', 'Users', 'admin.users', false, [ USER_ROLES.admin ]);
    }

])

// .factory('Users', ['$resource',
//
//     function ($resource) {
//         return $resource('/api/admin/users/:id',
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
        $scope.totalNbUsers = 0;
        $scope.nbUsersPerPage = 5;
        $scope.nbUsersPages = 0;
        $scope.currentUsersPage = 1;

        $http
        .get('/api/admin/users/count')
        .then(function (res) {
            $scope.totalNbUsers = res.data;
        });

        $http
        .get('/api/admin/users/' + $scope.nbUsersPerPage + '/' + $scope.currentUsersPage)
        .then(function (res) {
            $scope.users = res.data;
        });

        $scope.userPageChanged = function () {
            $http
            .get('/api/admin/users/' + $scope.nbUsersPerPage + '/' + $scope.currentUsersPage)
            .then(function (res) {
                $scope.users = res.data;
            });
        };

        $scope.addUser = function () {
            if ($scope.addUserFormData.password != $scope.addUserFormData.passwordConfirm) {
                $scope.passwordConfirmError = true;
            } else {
                $scope.passwordConfirmError = false;
                $http
                .post('/api/admin/users', $scope.addUserFormData)
                .then(function (res) {
                    if (res.data.success) {
                        $scope.addUserFormData = {};
                        $scope.totalNbUsers++;
                    }
                });
            }
        };

        $scope.updateUser = function (user, prop, value) {
            if (user.hasOwnProperty(prop)) {
                var updateData = {};
                updateData[prop] = value;

                $http
                .put('/api/admin/users/' + user._id, updateData)
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
                .put('/api/admin/users/' + user._id, { roles : new_roles })
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
                .put('/api/admin/users/' + user._id, { roles : new_roles })
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
                .delete('/api/admin/users/' + user._id)
                .then(function (res) {
                    if (res.data.success) {
                        var index = 0;
                        for (index = 0; index < $scope.users.length; index++) {
                            if ($scope.users[index]._id == user._id)
                                break;
                        }
                        if (index < $scope.users.length) {
                            $scope.totalNbUsers--;
                        }
                    }
                });
            });
        };
    }
]);