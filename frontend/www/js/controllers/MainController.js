//MainController.js

yppApp.controller('MainController', ['$scope', 'UsersResource', function($scope, UsersResource) {
  $scope.helloWorld = 'Hello World!';
  $scope.tmpUid = 1;

  $scope.initialize = function(){
    UsersResource.fetchUser({uid: $scope.tmpUid}, function(err, response){
      if (err){
        console.error.bind(console, 'MainController::Initialize()::' , err);
      }
      else{
        console.log(response);
      }
    });
  };
  // StallsResource.fetchStalls({}, function(response){
  //   var total = response.stalls.length;
  //   $scope.randomStall = response.stalls[Math.round(Math.random() * (total-1))].id;
  // });

}]);