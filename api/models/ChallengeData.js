//ChallengeData.js
var mongoose = require('mongoose'),
    autoincrement = require('mongoose-auto-increment');

module.exports = function(database){
  var db = database;
  autoincrement.initialize(database);

  var Schema = mongoose.Schema;
  var challengeDataSchema = new Schema({
    userId: Number,
    challengeId: Number,
    data: Number,
    description: String,
    date: Date
  });

  var ChallengeData = mongoose.model('ChallengeData', challengeDataSchema);

  ChallengeData.newChallengeData = function(newData, callback){
    var challengeData = new ChallengeData(newData);
    challengeData.save(callback);
  };

  ChallengeData.getAllChallengesByFilter = function(args, callback){
    var query = {};
    if (args){
      if (args.uid){
        query['userId'] = args.uid;
      }
      if (args.cid){
        query['challengeId'] = args.cid;
      }
      if (args.date){
        query['date'] = args.date;
      }
      else if (args.startDate && args.endDate){
        query['date'] = { $gt: args.startDate, $lt: args.endDate };
      }
    }
    return ChallengeData.find(query, callback);
  };

  ChallengeData.removeAllData = function(callback){
    ChallengeData.remove({}, callback);
  }
  return ChallengeData;
};