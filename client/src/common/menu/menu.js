'use strict';

angular.module('menu', [
    'userAuth'
])

.factory('MenuService', [ 'USER_ROLES',

    function (USER_ROLES) {

        var _menuItems = [];

        function _getMenuItem (menuTitle) {
            for (var i = 0; i < _menuItems.length; i++) {
                if (_menuItems[i].title == menuTitle) {
                    return _menuItems[i];
                }
            }
            return null;
        };

        return {

            addMenuItem : function (menuTitle, isPublic, authRoles) {
                for (var i = 0; i < _menuItems.length; i++) {
                    if (_menuItems[i].title == menuTitle) {
                        return;
                    }
                }
                _menuItems.push({
                    title  : menuTitle;
                    public : angular.isDefined(isPublic) ? isPublic : true;
                    roles  : angular.isDefined(authRoles) ? authRoles : [USER_ROLES.user];
                    subMenuItems : [];
                });
            },

            addSubMenuItem : function (menuTitle, subMenuTitle, itemRoute, isPublic, authRoles) {
                var menu = _getMenuItem(menuTitle);
                if (menu) {
                    for (var i = 0; i < menu.subMenuItems.length; i++) {
                        if (menu.subMenuItems[i].title == subMenuTitle) {
                            return;
                        }
                    }
                    menu.subMenuItems.push({
                        title  : subMenuTitle;
                        public : angular.isDefined(isPublic) ? isPublic : true;
                        roles  : angular.isDefined(authRoles) ? authRoles : [USER_ROLES.user];
                        route  : itemRoute;
                    });
                }
            }

        };
    }
])

;
