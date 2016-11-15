angular.module('init_firebase', [])

.factory('InitFirebase', function() {
    var config = {
        apiKey: "AIzaSyARQQODWTZVWID9kXokJQLl7sxKLus-RMc",
        authDomain: "f002-f2c56.firebaseapp.com",
        databaseURL: "https://f002-f2c56.firebaseio.com",
        storageBucket: "f002-f2c56.appspot.com",
        messagingSenderId: "698449516343"
    };
    console.log("Firebase is started...");
    return firebase.initializeApp(config);
})
