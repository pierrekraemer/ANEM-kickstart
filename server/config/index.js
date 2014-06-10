'use strict';

module.exports = function (app,
                           express,
                           bodyParser,
                           cookieParser,
                           session,
                           methodOverride,
                           favicon,
                           userModel,
                           passport,
                           logger,
                           publicPath) {

    app.use(favicon(publicPath + '/assets/favicon.ico'));
    app.use(express.static(publicPath));

    app.use(logger('dev'));

    app.use(cookieParser());
    app.use(bodyParser());

    app.use(methodOverride()); // allows request of type DELETE and PUT

    app.use(session({
        secret: 'thisismysecret',
        cookie: { maxAge: (86400 * 1000) } // 24h
    }));

    require('./passport')(passport, userModel);

    app.use(passport.initialize());
    app.use(passport.session());

};
