//Challenges.js
var mongoose = require('mongoose'),
    autoincrement = require('mongoose-auto-increment');

module.exports = function(database){
  var db = database;
  autoincrement.initialize(database);

  var Schema = mongoose.Schema;
  var challengesSchema = new Schema({
    cid: Number,
    name: String,
    description: String,
    isPrivate: Boolean,
    metric: String,
    participants: [Number],
    isActive: Boolean,
    useTimer: Boolean,
    category: String
  });

  challengesSchema.plugin(autoincrement.plugin, {model: 'Challenges', field: 'cid', startAt: 1, incrementBy: 1});
  var Challenges = mongoose.model('Challenges', challengesSchema);

  Challenges.newChallenge = function(newChallenge, callback){
    var challenge = new Challenges(newChallenge);
    challenge.save(callback);
  };

  Challenges.getChallenge = function(cid, callback){
    return Challenges.find({'cid': cid}, callback);
  };

  Challenges.getAllChallenges = function(callback){
    return Challenges.find({}, callback);
  };

  Challenges.removeAllChallenges = function(callback){
    //Challenges.resetCount();
    Challenges.remove({}, callback);
  }

  return Challenges;
};