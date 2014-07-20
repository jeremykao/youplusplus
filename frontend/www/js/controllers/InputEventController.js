//InputEventController.js
yppApp.controller('InputEventController', ['$scope', 'UserService', 'UserChallengeResource', function($scope, UserService, UserChallengeResource){
  $scope.eventObj = {
    userId: 0,
    challengeId: "",
    data: 0,
    description: "",
    date: Date.now()
  };
  $scope.$watch('eventObj.userId', function(){
    if ($scope.eventObj.userId !== 0){
      UserChallengeResource.fetchUserChallenges({uid: $scope.eventObj.userId}, function(response){
        $scope.challengeOptions = response.data;

        $scope.$watch('eventObj.challengeId', function(){
          console.log($scope.challengeOptions);
          for (var i = 0; i < $scope.challengeOptions.length; ++i){
            if ($scope.challengeOptions[i].cid === $scope.eventObj.challengeId){
              console.log("YOLOL");
              $scope.metric = $scope.challengeOptions[i].metric;
            }
          }
        });
      });
    }
  });
  $scope.eventObj.userId = UserService.getUid();
  $scope.submitEvent = function(challengeId){
    console.log(challengeId);
  };
}]);