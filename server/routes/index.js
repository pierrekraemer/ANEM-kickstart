'use strict';

module.exports = function (app, express, controllers, publicPath) {

    require('./signin')(app, express, controllers.signin);
    require('./users')(app, express, controllers.users);

    app.all('/*', function(req, res) {
        res.sendfile(publicPath + '/index.html');
    });

};
