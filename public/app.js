var app = angular.module("myApp", ["firebase"]);

app.controller("myCtrl", ["$scope", "$firebaseAuth", "$rootScope",
  function($scope, $firebaseAuth, $rootScope) {

      //
      const startDate = new Date(2015, 12, 19);
      
      var ref = new Firebase("https://boiling-torch-7071.firebaseio.com/users/");
      //set login to false
      $scope.login_success = false;
      // create an instance of the authentication service
      var auth = $firebaseAuth(ref);
      
      // login with Facebook
      auth.$authWithOAuthPopup("facebook").then(function(authData) {
        console.log("Logged in as:", authData.uid);
          $rootScope.userData = authData;
          $rootScope.userData.weight = {'notTest':-1};
          $scope.login_message= "Hi, " + authData.facebook.displayName;
          $scope.profile_image= authData.facebook.profileImageURL;
          $scope.login_success=true;
          ref.child(authData.uid).set($rootScope.userData);

        }).catch(function(error) {
        console.log("Authentication failed:", error);
        });

      //var currentWeight = $scope.user.weight;

      $scope.submit =  function(authData) {
      //ref.authData.child('weight').set({week1: currentWeight});
        $rootScope.userData.weight['test'] = 55
        console.log("submitted");
        //console.log($rootScope.userData);
        //var child = ref.getData($rootScope.userData.uid);
        //console.log(child);
        //child.update({"week1": $scope.user.weight });
          ref.child($rootScope.userData.uid).once('value', function(snapshot) {
            var val = snapshot.val();
            var w = val.weight;
            w['other'] = 6;
            //console.log(w);
            ref.child($rootScope.userData.uid).update({'weight':w});
            //console.log(snapshot.val());
          });
      }

      console.log($rootScope);

        
  }
]);

//userInfo { authData, weight, ... }
