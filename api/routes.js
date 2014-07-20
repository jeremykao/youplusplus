//routes.js
var Joi = require('joi');
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
var ChallengeData = require('./models/ChallengeData')(db);

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
  },
  {
    path: '/events',
    method: 'GET',
    config: {
      handler: getEvents,
      validate: {
        query: {
          uid: Joi.number(),
          cid: Joi.number(),
          date: Joi.date(),
          startDate: Joi.number(),
          endDate: Joi.number()
        }
      }
    }
  },
  {
    path: '/reset/888',
    method: 'GET',
    handler: reset
  },
  {
    path: '/populate',
    method: 'GET',
    handler: populate
  }

];

//called on GET: /
function defaultFunc(request, reply){
  reply("Yup, you just hit the You++ API.");
}

//called on GET: /users
function getAllUsers(request, reply){
  Users.getAllUsers(function(err, users){
    if (!err)
    reply({data: users});
  })
}

//called on POST: /users
function createUser(request, reply){
  Users.newUser(request.payload, function(err, user){
    if (err){
      console.error.bind(console, "error when inserting new user into db: ");
    }
    else{
      reply({data: user});
    }
  });
}
//called on GET: /users/{uid}
function getSingleUser(request, reply){
  Users.getUser(request.params.uid, function(err, user){
    if (!err)
      reply({data: user});
  });
}

//called on GET: /challenges
function getAllChallenges(request, reply){
  Challenges.getAllChallenges(function(err, challenges){
    if (!err)
      reply({data: challenges});
  })
}

//called on POST: /challenges
function createChallenge(request, reply){
  console.log(request);
  Challenges.newChallenge(request.payload, function(err, challenge){
    if (err){
      console.error.bind(console, "error when inserting new user into db: ");
    }
    else{
      reply({data: challenge});
    }
  });
}
//called on GET: /challenges/{cid}
function getSingleChallenge(request, reply){
  Challenges.getChallenge(request.params.cid, function(err, challenge){
    if (!err)
      reply({data: challenge});
  });
}
//called on GET: /events?...
function getEvents(request, reply){
  ChallengeData.getAllChallengesByFilter(request.query, function(err, response){
    if (!err)
      reply({data: response});
  });
}

//called on GET /reset
function reset(request, reply){
  Users.removeAllUsers();
  Challenges.removeAllChallenges();
  ChallengeData.removeAllData();
}

//called on GET /populate
function populate(request, reply){
  var testUsers = [
    {
      fname: "Johnny",
      lname: "Rocket",
    },
    {
      fname: "Yolo",
      lname: "Swag"
    },
    {
      fname: "Tim",
      lname: "Howard"
    }
  ];
  var testChallenges = [
    {
      name: "Sleep for more than 8 hours per day.",
      description: "Sleep is good for you. Log how many hours you sleep each day.",
      isPrivate: false,
      metric: "hours",
      isActive: true,
      useTimer: true,
      category: "Health"
    },
    {
      name: "Walk over 10,000 steps everyday.",
      description: "Gotta get dat exercise.",
      isPrivate: false,
      metric: "steps",
      isActive: true,
      useTimer: false,
      category: "fitness"
    },
    {
      name: "Do your Homework!",
      description: "Don't get distracted. Do your homework. Log your hours studied everyday.",
      isPrivate: false,
      metric: "hours",
      isActive: true,
      useTimer: true,
      category: "work/school"
    },
    {
      name: "Get better at Guitar!",
      description: "Get better at Guitar by playing everyday!",
      isPrivate: false,
      metric: "minutes",
      isActive: true,
      useTimer: true,
      category: "personal"
    },
    {
      name: "Catch up with a friend everyday!",
      description: "Maintain your relationships!",
      isPrivate: false,
      metric: "people",
      isActive: true,
      useTimer: false,
      category: "relationships"
    }
  ];
  var testEvents = [
    {
      userId: 0,
      challengeId: 0,
      data: 6,
      description: "Good ass sleep.",
      date: Date.now()
    },
    {
      userId: 1,
      challengeId: 0,
      data: 7.7,
      description: "Better ass sleep.",
      date: Date.now()
    }
  ];

  for (var i = 0; i < testUsers.length; ++i){
    Users.newUser(testUsers[i]);
  }
  for (var i = 0; i < testChallenges.length; ++i){
    Challenges.newChallenge(testChallenges[i]);
  }
  for (var i = 0; i < testEvents.length; ++i){
    ChallengeData.newChallengeData(testEvents[i]);
  }

}