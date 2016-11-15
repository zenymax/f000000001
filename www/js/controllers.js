angular.module('mychat.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $state, $ionicLoading, $firebaseAuth, $firebaseObject, $firebaseArray) {
  console.log("LoginCtrl initialized ");

  // default modal for view and logic
  $scope.signUpUser = {}
  $scope.signInUser = {}

  // pass first modal (login screen) to second modal (sign-up screen) and controll sign-up screen in login controller
  $ionicModal.fromTemplateUrl('templates/sign-up.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
    $scope.signUpModal = modal
  })

  // create user data with firebase
  $scope.createUser = function(user) {
    console.log("user ", user);
    if (user && user.email && user.password) {

      $ionicLoading.show({
        template: 'Waiting ... ! ...'
      });

      $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password).then(function(userData) {
        console.log("Create successfully ", userData);
        var ref = firebase.database().ref('users')
        $firebaseArray(ref).$add({
          email: userData.email,
          uid: userData.uid,
          displayName: userData.displayName,
        })
        $ionicLoading.hide();
        $scope.signUpModal.hide();
      }).catch(function(error) {
        console.log("createUser error ", error);
        // can not hide this. bug framework
        setTimeout($ionicLoading.hide, 1)
      })
    } 
  }

  // hide sign-up screen and show login screen
  $scope.hideSignUp = function() {
    $scope.signUpModal.hide();
  };

  // listener event for sign-up screen hidden
  $scope.$on('modal.hidden', function() {
    $scope.signUpUser.email = ''
    $scope.signUpUser.password = ''
  })

  // sign-in action logic
  $scope.signIn = function(user) {
    if (user && user.email && user.password) {

      $ionicLoading.show({
        template: 'Signing ... ! ...'
      });

      $firebaseAuth().$signInWithEmailAndPassword(user.email, user.password).then(function(userData) {
        $ionicLoading.hide();
      }).catch(function(error) {
        $ionicLoading.hide();
      })
    }

    // var ref = firebase.database().ref('message')
    // $firebaseArray(ref).$add({name: 'hot ga`'})
  }

  $scope.signInGmail = function() {
    console.log("$firebaseAuth() ", $firebaseAuth());
    $firebaseAuth().$signInWithPopup('google').then(function(authData) {
      console.log("Gmail auth ", authData);
      $state.go('tab.room')
    })
  }

  // Auth.$onAuth(function(authData) {
  //   console.log("ah ha ", authData);
  // })
})

.controller('ChatCtrl', function($scope, FetchDatas, $firebaseArray) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log("ChatCtrl initialized ", FetchDatas);

    var ref = firebase.database().ref().child('message')
    var test = $firebaseArray(ref)

    var query = ref.orderByChild("timestamp").limitToLast(25);
    // the $firebaseArray service properly handles database queries as well
    var top = $firebaseArray(query);

    console.log('test ', test.$ref('message'))
    console.log('top ', top)


  for (var i=0; i< FetchDatas.length; i++) {
      console.log('fff ', FetchDatas[i])
  }

  // $scope.chats = Chats.all();

  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('RoomCtrl', function($scope, FetchRooms) {
  console.log("RoomCtrl initialized ", FetchRooms);

  // $scope.rooms = Rooms.all()
})

.controller('LogoutCtrl', function($scope, $state, $firebaseAuth, $rootScope) {
  console.log("LogoutCtrl initialized");

  // $firebaseAuth().$signOut()
  // $state.go('login')
  $rootScope.logout()
})

.controller('SignupCtrl', function($scope, $ionicLoading) {
  console.log("SignupCtrl initialized");



  $scope.createUser = function(user) {
    console.log("user ", user);
    // $ionicLoading.show({
    //   template: 'Signing Up...'
    // });
    $scope.modal.hide();
  }


})
