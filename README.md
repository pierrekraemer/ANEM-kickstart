ANEM-kickstart
==============

Angular Node Express Mongo kickstart

***

Quick start
-----------

First install [Node.js](http://nodejs.org/) and [MongoDB](http://www.mongodb.org/), then:

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

The site should be available at : localhost:3000


Presentation
------------

`ANEM-kickstart` provides a starting point for a web application using
[Node.js](http://nodejs.org/), [Express](http://expressjs.com/) and [MongoDB](http://www.mongodb.org/) on server side
and [AngularJS](https://angularjs.org/) on client side.

It provides user management with local authentification.
A user with 'admin' role can create / update / delete users.

To create a first user, do the following:

```sh
$ mongo
$ use ANEM-kickstart
$ db.users.insert({ firstname:'Bla', lastname:'Bla', username:'bla', password:'', roles:['user','admin'] })
```

The password should be generated using bcrypt (you can use an online like [this one](http://bcrypthashgenerator.apphb.com/)).


Customize
---------

To change the name of the application, you should change:
- the "name" field in package.json and bower.json
- the "APP_NAME" constant in client/src/app/app.js
- the css and js file names in client/src/index.html
- the name of the database in server/db/index.js
