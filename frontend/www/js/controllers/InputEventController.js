//InputEventController.js
yppApp.controller('InputEventController', ['$scope', 'UserService', 'UserChallengeResource', 'ChallengeDataResource', '$window', function($scope, UserService, UserChallengeResource, ChallengeDataResource, $window){
  $scope.eventObj = {
    userId: 0,
    challengeId: "",
    data: null  ,
    description: "",
    date: Date.now()
  };
  $scope.selectedChallenge = false;
  $scope.$watch('eventObj.userId', function(){
    if ($scope.eventObj.userId !== 0){
      UserChallengeResource.fetchUserChallenges({uid: $scope.eventObj.userId}, function(response){
        $scope.challengeOptions = response.data;

        $scope.$watch('eventObj.challengeId', function(){
          console.log($scope.challengeOptions);
          for (var i = 0; i < $scope.challengeOptions.length; ++i){
            if ($scope.challengeOptions[i].cid === $scope.eventObj.challengeId){
              $scope.metric = $scope.challengeOptions[i].metric;
              $scope.selectedChallenge = true;
            }
          }
        });
      });
    }
  });
  $scope.eventObj.userId = UserService.getUid();

  $scope.submitEvent = function(){
    ChallengeDataResource.createEvent($scope.eventObj, function(response){
      $window.location.href='/#/dashboard';
    });
  };
}]);