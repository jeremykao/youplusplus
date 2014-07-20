//app.js
var yppApp = angular.module('youPlusPlusApp', ['ngRoute', 'ngResource', 'ngTouch']);

yppApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'js/partials/main.html',
      controller: 'MainController'
    })
    .when('/inputEvent', {
      templateUrl: 'js/partials/inputEvent.html',
      controller: 'InputEventController'
    })
  }
]);

yppApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

angular.element(document).ready(function() {
      angular.bootstrap(document, ['youPlusPlusApp']);
  });
