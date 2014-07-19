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
var Challenges = require('./models/Challenges')(db);

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
  },
  {
    path: '/challenges',
    method: 'GET',
    handler: getAllChallenges
  },
  {
    path: '/challenges',
    method: 'POST',
    handler: createChallenge
  },
  {
    path: '/challenges/{cid}',
    method: 'GET',
    handler: getSingleChallenge
  }

];

//called on GET: /
function defaultFunc(request, reply){
  reply("Yup, you just hit the You++ API.");
}

//called on GET: /users
function getAllUsers(request, reply){
  Users.getAllUsers(function(err, users){
    reply(users);
  })
}

//called on POST: /users
function createUser(request, reply){
  Users.newUser(request.params.newUser, function(err, user){
    if (err){
      console.error.bind(err, "error when inserting new user into db: ");
    }
    else{
      reply(user);
    }
  });
}
//called on GET: /users/{uid}
function getSingleUser(request, reply){
  Users.getUser(request.params.uid, function(err, user){
    reply(user);
  });
}

//called on GET: /challenges
function getAllChallenges(request, reply){
  Challenges.getAllChallenges(function(err, challenges){
    reply(challenges);
  })
}

//called on POST: /challenges
function createChallenge(request, reply){
  Challenges.newChallenge(request.params.newChallenge, function(err, challenge){
    if (err){
      console.error.bind(err, "error when inserting new user into db: ");
    }
    else{
      reply(challenge);
    }
  });
}
//called on GET: /challenges/{cid}
function getSingleChallenge(request, reply){
  Challenges.getChallenge(request.params.cid, function(err, challenge){
    reply(challenge);
  });
}