//CreateChallengeController.js

yppApp.controller('CreateChallengeController', ['$scope', 'ChallengesResource', 'UserService', '$window', function($scope, ChallengesResource, UserService, $window) {
  $scope.categories = ['Fitness', 'Personal', 'School/Work', 'Relationships', 'Health'];
  $scope.createNewChallenge = function(){
    if ($scope.challengeForm){
      var params = _.extend($scope.challengeForm, {participants: [UserService.getUid()]});
      console.log(params);
      ChallengesResource.createChallenge(params, function(response){
        $window.location.href="/#/dashboard";
      });
    }
  };

}]);