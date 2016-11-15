// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var firebaseUrl = "https://f002-f2c56.firebaseio.com";

angular.module('mychat', ['ionic', 'firebase', 'mychat.controllers', 'mychat.services'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.logout = function() {
      console.log("Logout nha ku...");
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignupCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth",
          function (Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            // return Auth.$waitForAuth();
            return Auth.requireAuth();
      }]
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.room', {
    url: '/room',
    views: {
      'room-list': {
        templateUrl: 'templates/room-list.html',
        controller: 'RoomCtrl'
      }
    }
  })

  .state('tab.chat', {
      url: '/chat',
      views: {
        'chat-room': {
          templateUrl: 'templates/chat-room.html',
          controller: 'ChatCtrl'
        }
      }
  })
  
  .state('tab.logout', {
    url: '/logout',
    views: {
      'logout': {
        templateUrl: 'templates/logout.html',
        controller: 'LogoutCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
