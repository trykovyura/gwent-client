app.controller('authCtrl', function($scope, Auth) {
    $scope.login = function(authMethod) {
        Auth.$authWithOAuthRedirect(authMethod).then(function(authData) {
            console.log('authData '+authData);
        }).catch(function(error) {
            if (error.code === 'TRANSPORT_UNAVAILABLE') {
                Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
                });
            } else {
                console.log(error);
            }
        });
    };
    Auth.$onAuth(function(authData) {
        if (authData === null) {
            console.log('Not logged in yet');
        } else {
            console.log('Logged in as', authData.uid);
        }
        // This will display the user's name in our view
        $scope.authData = authData;
    });
    $scope.logout = function () {
        Auth.unauth();
    };

    /**
     * Аутентификация через почту
     */
    $scope.authWithPassword = function () {
        console.log($scope.loginData);
        Auth.authWithPassword({
            email    : $scope.loginData.username,
            password : $scope.loginData.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        });
    };
});