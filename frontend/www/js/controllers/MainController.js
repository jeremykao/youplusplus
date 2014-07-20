//MainController.js

yppApp.controller('MainController', ['$scope', 'UsersResource', 'UserService', function($scope, UsersResource, UserService) {
  $scope.helloWorld = 'Hello World!';
  $scope.tmpUid = 1;
  $scope.user = UserService.fullName();

  $scope.initialize = function(){
    UsersResource.fetchUser({uid: $scope.tmpUid}, function(response){
      UserService.save(response.data[0]);
      $scope.user = UserService.fullName();
      $scope.uid = UserService.user.uid;
    });
  };
  // StallsResource.fetchStalls({}, function(response){
  //   var total = response.stalls.length;
  //   $scope.randomStall = response.stalls[Math.round(Math.random() * (total-1))].id;
  // });

}]);