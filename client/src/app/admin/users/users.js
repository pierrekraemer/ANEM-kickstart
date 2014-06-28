'use strict';

angular.module('main.admin.users', [
    'ui.router',
    'ngResource',
    'userAuth',
    'menu',
    'ui.bootstrap',
    'xeditable'
])

.config(['$stateProvider',

    function ($stateProvider) {

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

.factory('Users', ['$http',

    function ($http) {
        return {
            count : function () {
                return $http
                .get('/api/users/count');
            },
            getPage : function (nbUsersPerPage, numPage) {
                return $http
                .get('/api/users/' + nbUsersPerPage + '/' + numPage);
            },
            create : function (user) {
                return $http
                .post('/api/users', user);
            },
            update : function (userId, data) {
                return $http
                .put('/api/users/' + userId, data)
            },
            delete : function (userId) {
                return $http
                .delete('/api/users/' + userId);
            }
        };
    }

])

.controller('AdminUserCtrl', ['$scope', '$modal', 'Users',

    function ($scope, $modal, Users) {

        $scope.showAddUser = false;
        $scope.addUserFormData = {};

        $scope.users = [];
        $scope.totalNbUsers = 0;
        $scope.nbUsersPerPage = 5;
        $scope.nbUsersPages = 0;
        $scope.currentUsersPage = 1;

        Users
        .count()
        .then(function (res) {
            $scope.totalNbUsers = res.data;
        });

        function updateUsersList () {
            Users
            .getPage($scope.nbUsersPerPage, $scope.currentUsersPage)
            .then(function (res) {
                $scope.users = res.data;
            });
        }

        updateUsersList();

        $scope.userPageChanged = function () {
            updateUsersList();
        };

        $scope.addUser = function () {
            if ($scope.addUserFormData.password != $scope.addUserFormData.passwordConfirm) {
                $scope.passwordConfirmError = true;
            } else {
                $scope.passwordConfirmError = false;
                Users
                .create($scope.addUserFormData)
                .then(function (res) {
                    $scope.addUserFormData = {};
                    $scope.totalNbUsers++;
                    updateUsersList();
                });
            }
        };

        $scope.updateUser = function (user, prop, value) {
            var updateData = {};
            updateData[prop] = value;

            Users
            .update(user._id, updateData)
            .then(
                function (res) { return true; },
                function (res) { return false; }
            );
        };

        $scope.addUserRole = function (user, role) {
            if (role && user.roles.indexOf(role) < 0) {
                var new_roles = user.roles.slice(0);
                new_roles.push(role);
                Users
                .update(user._id, { roles : new_roles })
                .then(function (res) {
                    user.roles.push(role);
                });
            }
        };

        $scope.removeUserRole = function (user, role) {
            var index = user.roles.indexOf(role);
            if (index > -1) {
                var new_roles = user.roles.slice(0);
                new_roles.splice(index, 1);
                Users
                .update(user._id, { roles : new_roles })
                .then(function (res) {
                    user.roles.splice(index, 1);
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
                Users
                .delete(user._id)
                .then(function (res) {
                    $scope.totalNbUsers--;
                    updateUsersList();
                });
            });
        };
    }
]);
