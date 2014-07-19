//Users.js
var mongoose = require('mongoose'),
    autoincrement = require('mongoose-auto-increment');

module.exports = function(database){
  var db = database;
  autoincrement.initialize(database);

  var Schema = mongoose.Schema;
  var usersSchema = new Schema({
    uid: Number,
    fname: String,
    lname: String,
    oauthProvider: [String],
    oauthUid: [String],
    challenges: [Number],
  });

  usersSchema.plugin(autoincrement.plugin, {model: 'Users', field: 'uid', startAt: 1, incrementBy: 1});
  var Users = mongoose.model('Users', usersSchema);

  Users.newUser = function(newUser){
    var user = new Users(newUser);
    user.save(function(err){
      if (err){
        console.error.bind(err, 'adding new user error:')
      }
    });
  };

  Users.getUser = function(uid, callback){
    return Users.find({'uid': uid}, callback);
  };

  Users.getAllUsers = function(callback){
    return Users.find({}, callback);
  };

  return Users;
};