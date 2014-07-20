//LoginController.js
yppApp.controller("LoginController", ['$scope', 'UsersResource', 'UserService', '$window', function($scope, UsersResource, UserService, $window){
  
  $scope.intialize = function(){
    if (UserService.getUid() !== 0){
      $window.location.href="/#/dashboard";
    }
  }

  $scope.isSigningUp = false;

  $scope.toggleButtonText = 'Sign Up';

  $scope.clickedButton = false;

  $scope.clickSignUp = function(){
    $scope.isSigningUp = true;
    $scope.clickedButton = true;
  };
  $scope.clickLogin = function(){
    $scope.isSigningUp = false;
    $scope.clickedButton = true;
  };

  $scope.loginUser = function(){
    UsersResource.fetchUsers({email: $scope.login.email, password: $scope.login.password}, function(response){
      console.log($scope.login, response);
      if (response.data[0].uid){
        UserService.save(response.data[0]);
        $window.location.href="/#/dashboard";
      }
    });
  };

  $scope.createUser = function(){
    UsersResource.createUser($scope.signup, function(response){
      if (response.data.uid){
        UserService.save(response.data);
        $window.location.href="/#/dashboard";
      }
    });
  };

}]);