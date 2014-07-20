//LoginController.js
yppApp.controller('LoginController', ['$scope', function($scope){
  $scope.isSigningUp = false;
  $scope.toggleButtonText = 'Sign Up'
  $scope.clickedButton = false;

  $scope.clickSignUp = function(){
    $scope.isSigningUp = true;
    $scope.clickedButton = true;
  }
  $scope.clickLogin = function(){
    $scope.isSigningUp = false;
    $scope.clickedButton = true;
  };

}]);