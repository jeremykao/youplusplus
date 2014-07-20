//InputEventController.js
yppApp.controller('InputEventController', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.eventObj = {
    userId: $rootScope.uid,
    challengeId: "",
    data: 0,
    description: "",
    date: Date.now()
  };

  $scope.submitEvent = function(challengeId){
    console.log(challengeId);
  };
}]);