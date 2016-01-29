var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", ["$scope", "$firebaseAuth", "$rootScope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseAuth, $rootScope, $firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://boiling-torch-7071.firebaseio.com/users/weight");

    //LINK WEIGHTLIST FROM DOM TO A FIREBASE ARRAY
    $scope.weightList = $firebaseArray(ref);

    //ADD WEIGHT ON SUBMIT
    $scope.addWeight = function() {
      console.log('submitted');
      $scope.weightList.$add({
        week: $scope.week,
        weight: $scope.weight,
        difference: 0,
        entered: true
      });

      console.log(weightList);
    }
  }
]);
