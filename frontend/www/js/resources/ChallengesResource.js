//ChallengesResource.js

yppApp.factory('ChallengesResource', ['$resource', function($resource){
  return $resource('http://youplusplus.herokuapp.com/challenges/:cid', 
    {cid: '@cid'},
    {
      fetchChallenges: {method: 'GET'},
      fetchChallenge: {method: 'GET'},
      createChallenge: {method: 'POST'}
    });
}]);