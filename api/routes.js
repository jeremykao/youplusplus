//routes.js
var Types = require('hapi').Types;
var mongoose = require('mongoose');

/*** Open DB Connection ***/
mongoose.connect('mongodb://localhost/youplusplus');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('opened database connection');
});

/*** Models ***/
var Users = require('./models/Users')(db);

/*** Routes ***/
module.exports = [
	{
    path: '/',
	  method: 'GET', 
	  handler: defaultFunc
	},
  {
    path: '/users',
    method: 'GET',
    handler: getAllUsers
  },
  {
    path: '/users',
    method: 'POST',
    handler: createUser
  },
  {
    path: '/users/{uid}',
    method: 'GET',
    handler: getSingleUser
  }
];

function defaultFunc(request, reply){
  reply("Yup, you just hit the You++ API.");
}

function getAllUsers(request, reply){
  Users.getAllUsers(function(err, users){
    reply(users);
  })
}
function createUser(request, reply){
  Users.newUser(request.params.newUser);
}
function getSingleUser(request, reply){
  Users.getUser(request.params.uid, function(err, user){
    reply(user);
  });
}
function test(request, reply){
  Users.getAllUsers(function(err, users){
    reply(users);
  });
}