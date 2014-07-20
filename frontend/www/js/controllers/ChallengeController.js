//InputEventController.js
yppApp.controller('ChallengeController', ['$scope', 'UserService', 'ChallengesResource', 'ChallengeDataResource', 'UserChallengeResource', '$window', '$routeParams', function($scope, UserService, ChallengesResource, ChallengeDataResource, UserChallengeResource,$window, $routeParams){
  $scope.uid = UserService.getUid();
  $scope.cid = $routeParams.cid;

  ChallengesResource.fetchChallenge({cid: $scope.cid}, function(response){
    $scope.challenge = response.data[0];
  })
  $scope.$watch('uid', function(){
    if ($scope.uid !== 0){
      UserChallengeResource.fetchUserChallenges({uid: $scope.uid, cid: $scope.cid}, function(response){
        $scope.userChallenges = response.data;
        _.map($scope.userChallenges, function(c){
          c.month = moment(c.date).format("MMMM");
          c.day = moment(c.date).format("DD");
          return c;
        });

        $scope.graphData = {
          labels: [],
          datasets:[{
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
          }]
        };
        $scope.graphData.datasets[0].label = 'Progress';
        _.each($scope.userChallenges, function(c){
          $scope.graphData.labels.push(moment(c.date).format("MMM-DD"));
          $scope.graphData.datasets[0].data.push(c.data);
        });
        var ctx = document.getElementById("myChart").getContext("2d");
        var myNewChart = new Chart(ctx).Line($scope.graphData, {});
      });
    }
  });
  
  $scope.openDesc = function(ev){
    var angularEl = angular.element(ev.target).parent().find('div');
    if (angularEl.hasClass('descOff'))
      angularEl.removeClass('descOff').addClass('descOn');
    else
      angularEl.removeClass('descOn').addClass('descOff');
  };

}]);