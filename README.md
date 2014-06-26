ANEM-kickstart
==============

An extensible AngularJS NodeJS ExpressJS MongoDB web application kickstart

***

Quick start
-----------

First install [NodeJS](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/), then:

```sh
$ git clone git://github.com/pierrekraemer/ANEM-kickstart
$ cd ANEM-kickstart
$ sudo npm -g install grunt-cli bower
$ npm install
$ bower install
$ grunt
```

Start a MongoDB server, then:

```sh
$ cd server
$ node server.js
```

The site should be available at : http://localhost:3000


Presentation
------------

`ANEM-kickstart` provides a starting point for an extensible web application using
[NodeJS](http://nodejs.org/), [ExpressJS](http://expressjs.com/), [Broadway](http://flatironjs.org/#plugins) and [MongoDB](http://www.mongodb.org/) on server side and [AngularJS](https://angularjs.org/) on client side.

It provides user management with local authentification.
Authentication is performed using a JsonWebToken.
A user with 'admin' role gets access to a user administration section where he can create / update / delete users.

To create a first user manually in the database, do the following:

```sh
$ mongo
$ use ANEM-kickstart
$ db.users.insert({ firstname:'Bla', lastname:'Bla', username:'bla', password:'', roles:['user','admin'] })
```

The password should be generated using bcrypt (you can use an online like [this one](http://bcrypthashgenerator.apphb.com/)).


Structure
---------

### Server side

```
server/
  |-server.js             --> main server file (create Broadway app & load plugins)
  |-app/                  --> application plugins
  |  |-db.js              --> configure database connection
  |  |-http.js            --> configure express
  |  |-users/
  |  |  |-index.js        --> configure plugin (using following files)
  |  |  |-model.js        --> model (mongoDB schema) is defined here
  |  |  |-controllers.js  --> application logic
  |  |  |-routes.js       --> routes definitions & access filtering
  |  |  |-passport.js     --> additional configuration..
  |-common/               --> common services
  |  |-loadRoutes.js      --> utility function for routes loading
```

The server must be relaunched to take code updates into account.

### Client side

```
client/
  |-vendor/                    --> third-party libraries (installed by bower)
  |-src/                       --> application src
  |  |-index.html              --> main template
  |  |-app/
  |  |  |-app.js               --> top-level module definition
  |  |  |-about/
  |  |  |-home/                --> each section gets its own directory
  |  |  |  |-home.css          --> with its associated css,
  |  |  |  |-home.js           --> module definition (routes, controller, service, directive, filter, ...),
  |  |  |  |-home.view.html    --> and views
  |  |  |-admin/
  |  |  |  |-admin.js
  |  |  |  |-user/             --> sections can have sub-sections with the same structure
  |  |  |  |  |-user.css
  |  |  |  |  |-user.js
  |  |  |  |  |-user.view.html
  |  |  |-user/
  |  |-assets/                 --> application assets (images, ...)
  |  |-common/                 --> application wide stuff (services, directives, views, ...)
  |  |  |-services/
  |  |  |  |-userAuth.js       --> user authentication service
  |  |  |  |-menu.js           --> menu management service
```

The `grunt` task creates a `public` directory that contains all the client files to be served statically by the server (views, js, css, assets).
JavaScript and CSS are concatenated into `app_name.app_version.js` and `app_name.app_version.css` files.

You can launch `grunt watch` to automatically re-copy or re-generate modified client side code.


Customize
---------

To change the name of the application, you should change:
- the "name" field in package.json and bower.json
- the "APP_NAME" constant in client/src/app/app.js
- the css and js file names in client/src/index.html
- the name of the database in server/db/index.js


Roadmap
-------

- Use angular $ressource
- set up tests
- Use [SemanticUI](http://semantic-ui.com/) in place of Bootstrap ?
