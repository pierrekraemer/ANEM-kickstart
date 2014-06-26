'use strict';

var broadway = require('broadway');
var path     = require('path');


var app = new broadway.App();


app.use(require('./app/db')());
app.use(require('./app/http')(), { publicPath : path.resolve('../public/') });

app.use(require('./common/loadRoutes')());

app.use(require('./app/users')());


app.init(function (err) {

    app.emit('allPluginsInitDone');

});
