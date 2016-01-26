var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) {

      //
      const startDate = new Date(2015, 12, 19);
      
      var ref = new Firebase("https://boiling-torch-7071.firebaseio.com");
      //set login to false
      $scope.login_success = false;
      // create an instance of the authentication service
      var auth = $firebaseAuth(ref);

      
      // login with Facebook
      auth.$authWithOAuthPopup("facebook").then(function(authData) {
        console.log("Logged in as:", authData.uid);

          //
          var dateDiff = (Date.now() - startDate) / 1000 / 60 / 60 / 24;
          console.log(dateDiff);
          authData.weight = {'wk1': 160};
          $scope.login_message= "Hi, " + authData.facebook.displayName;
          $scope.profile_image= authData.facebook.profileImageURL;
          $scope.login_success=true;
          ref.child(authData.uid).set(authData);
        }).catch(function(error) {
        console.log("Authentication failed:", error);
        });

        $scope.submit = function(){
        var currentWeight = $scope.user.weight;
        console.log(currentWeight);
        return currentWeight;
      }         
  }
]);

//userInfo { authData, weight, ... }
