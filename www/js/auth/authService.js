app.factory('Auth', function($firebaseAuth) {
    var endPoint = 'pathToFirebase' ;
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
});