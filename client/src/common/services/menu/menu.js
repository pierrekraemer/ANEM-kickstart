'use strict';

angular.module('menu', [])

.factory('MenuService',

    function () {

        var _menuItems = [];

        function _getMenuItem (menu, itemTitle) {
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].title == itemTitle) {
                    return menu[i];
                }
            }
            return null;
        };

        return {

            getMenu : function () {
                return _menuItems;
            },

            addMenuItem : function (menuItemTitle, menuItemState, menuItemType, isPublic, authRoles) {
                var menuItem = _getMenuItem(_menuItems, menuItemTitle);
                if (!menuItem) {
                    menuItem = {
                        title  : menuItemTitle,
                        state  : menuItemState,
                        type   : angular.isDefined(menuItemType) ? menuItemType : 'item',
                        public : angular.isDefined(isPublic) ? isPublic : true,
                        roles  : [],
                        subMenuItems : []
                    };
                    if (!isPublic) {
                        menuItem.roles = authRoles;
                    }
                    _menuItems.push(menuItem);
                }
            },

            addSubMenuItem : function (menuItemTitle, subMenuItemTitle, subMenuItemState, isPublic, authRoles) {
                var menuItem = _getMenuItem(_menuItems, menuItemTitle);
                if (!menuItem) {
                    menuItem = {
                        title  : menuItemTitle,
                        state  : '',
                        type   : 'dropdown',
                        public : angular.isDefined(isPublic) ? isPublic : true,
                        roles  : [],
                        subMenuItems : []
                    };
                    if (!isPublic) {
                        menuItem.roles = authRoles;
                    }
                    _menuItems.push(menuItem);
                }
                var subMenuItem = _getMenuItem(menuItem.subMenuItems, subMenuItemTitle);
                if (!subMenuItem) {
                    menuItem.state = '';
                    menuItem.type = 'dropdown';
                    var subMenuItem = {
                        title  : subMenuItemTitle,
                        state  : subMenuItemState,
                        public : angular.isDefined(isPublic) ? isPublic : true,
                        roles  : []
                    };
                    if (!isPublic) {
                        subMenuItem.roles = authRoles;
                        menuItem.roles = menuItem.roles.concat(authRoles);
                    } else {
                        menuItem.public = isPublic;
                    }
                    menuItem.subMenuItems.push(subMenuItem);
                }
            }

        };
    }
)

.directive('myMenu',

    function () {

        return {
            restrict    : 'AE',
            templateUrl : 'views/common/menu.view.html'
        };

    }

)

;
