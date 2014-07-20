//UserChallengeResource.js

yppApp.factory('UserChallengeResource', ['$resource', function($resource){
  return $resource('http://youplusplus.herokuapp.com/users/:uid/challenges/:cid', 
    {uid: '@uid', cid: '@cid'},
    {
      fetchUserChallenges: {method: 'GET'},
      fetchUserChallenge: {method: 'GET'},
    });
}]);