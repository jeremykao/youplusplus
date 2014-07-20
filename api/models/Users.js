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
    challenges: [{type: Number, ref: 'Challenges'}]
  });

  usersSchema.plugin(autoincrement.plugin, {model: 'Users', field: 'uid', startAt: 1, incrementBy: 1});
  var Users = mongoose.model('Users', usersSchema);

  Users.newUser = function(newUser, callback){
    var user = new Users(newUser);
    user.save(callback);
  };

  Users.getUser = function(uid, callback){
    return Users.find({'uid': uid}).exec(callback);
  };

  Users.getAllUsers = function(callback){
    return Users.find({}, callback);
  };

  Users.removeAllUsers = function(){
    //Users.resetCount();
    Users.remove({});
  }
  Users.updateUser = function(uid, updateParams, callback){
    var updateQuery = {};
    if(updateParams.cid)
      updateQuery['$push'] = {'challenges': updateParams.cid};
    Users.update({'uid': uid}, updateQuery, function(err, response){
      console.log(response);
    });
  }
  return Users;
};