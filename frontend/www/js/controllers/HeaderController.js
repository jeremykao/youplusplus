//HeaderControllerjs

yppApp.controller('HeaderController', ['$scope', '$window', function($scope, $window) {
  $scope.helloWorld = 'Hello World!';

  $scope.addEvent = function(){
    $window.location.href="/#/addEvent";
  };
  $scope.createChallenge = function(){
    $window.location.href="/#/createChallenge";
  }
      // StallsResource.fetchStalls({}, function(response){
      //   var total = response.stalls.length;
      //   $scope.randomStall = response.stalls[Math.round(Math.random() * (total-1))].id;
      // });
}]);