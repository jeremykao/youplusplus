//MainController.js

yppApp.controller('MainController', ['$window', '$scope', 'UsersResource', 'UserService', 'UserChallengeResource', function($window, $scope, UsersResource, UserService, UserChallengeResource) {
  $scope.helloWorld = 'Hello World!';
  $scope.tmpUid = 1;
  $scope.user = UserService.fullName();
  $scope.uid = UserService.getUid();

  $scope.initialize = function(){
    if($scope.uid === 0){
      UsersResource.fetchUser({uid: $scope.tmpUid}, function(response){
        UserService.save(response.data[0]);
        $scope.user = UserService.fullName();
        $scope.uid = UserService.getUid();
        UserChallengeResource.fetchUserChallenges({uid: $scope.uid}, function(response){
         $scope.challenges = response.data;
        });
      });
    }
  };

  $scope.goToChallenge = function(cid){
    //console.log("/#/challenges/" + cid);
    $window.location.href = "/#/challenges/" + cid;
  };

  $scope.$watch('uid', function(){
    if ( $scope.uid !== 0 ){
      UserChallengeResource.fetchUserChallenges({uid: $scope.uid}, function(response){
        $scope.challenges = response.data;
      });
    }
  });
  // StallsResource.fetchStalls({}, function(response){
  //   var total = response.stalls.length;
  //   $scope.randomStall = response.stalls[Math.round(Math.random() * (total-1))].id;
  // });

}]);