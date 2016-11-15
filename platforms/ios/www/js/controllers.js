angular.module('mychat.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, Auth) {
  console.log("LoginCtrl initialized");

  $ionicModal.fromTemplateUrl('templates/sign-up.html', {scope: $scope}).then(function(modal) {
    $scope.modal = modal
  })

  $scope.signUp = function() {
    $state.go('signup')
  }

  $scope.signIn = function() {
    $state.go('tab.room')
  }

  $scope.signInGmail = function() {
    console.log("Gmail cai nha ", $scope);
  }
})

.controller('ChatCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log("ChatCtrl initialized");

  $scope.chats = Chats.all();

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('RoomCtrl', function($scope) {
  console.log("RoomCtrl initialized");

  // $scope.rooms = Rooms.all()
})

.controller('LogoutCtrl', function($scope, $state) {
  console.log("LogoutCtrl initialized");
})

.controller('SignupCtrl', function($scope) {
  console.log("SignupCtrl initialized");
})
