'use strict';

module.exports = function (app, express, controllers, publicPath) {

    require('./signin')(app, express, controllers.signin);
    require('./user')(app, express, controllers.user);

    app.all('/*', function(req, res) {
        res.sendfile(publicPath + '/index.html');
    });

};
