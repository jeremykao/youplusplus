//ChallengeDataResource.js

yppApp.factory('ChallengeDataResource', ['$resource', function($resource){
  return $resource('http://youplusplus.herokuapp.com/events', 
    {},
    {
      createEvent: {method: 'POST'}
    });
}]);