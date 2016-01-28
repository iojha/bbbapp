var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", ["$scope", "$firebaseAuth", "$rootScope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseAuth, $rootScope, $firebaseObject, $firebaseArray) {
      
      var ref = new Firebase("https://boiling-torch-7071.firebaseio.com/users/");

      var auth = $firebaseAuth(ref);

      //set login to false
      $scope.login_success = false;

      //login with Facebook
      $scope.login = function(){ 
        auth.$authWithOAuthPopup("facebook").then(function(authData) {
          $rootScope.userData = authData;
          console.log("Logged in as:", authData.uid);
          }).catch(function(error) {
          console.log("Authentication failed:", error);
        });
      }

      $scope.weights = $firebaseArray(ref.child("weights"));

      $scope.submit = function(){
        $scope.weights.$add($scope.weight);
        console.log("added");
      };  
    }]);

    //OLD CODE
        // $scope.submit =  function(authData) {
        //   $rootScope.userData.weight[$scope.user.week] = $scope.user.weight
        //   console.log("submitted");
        //    ref.child($rootScope.userData.uid).once('value', function(snapshot) {
        //       var val = snapshot.val();
        //       var w = val.weight;
        //       w['week' + $rootScope.userData.weight[$scope.user.week]=$scope.user.weight;
        //       ref.child($rootScope.userData.uid).update({'weight':w});
        //     });
        // }




      
      //REMOVED CODE
          // var userInfo = $firebaseAuth(ref);
          // var userWeight = authData.uid.weight;
          // $scope.weight = userWeight;
          // $rootScope.userData = authData;
          // $rootScope.userData.weight = {'notTest':-1};
          // $scope.login_message= "Hi, " + authData.facebook.displayName;
          // $scope.profile_image= authData.facebook.profileImageURL;
          // $scope.login_success=true;
          // ref.child(authData.uid).set($rootScope.userData);
        