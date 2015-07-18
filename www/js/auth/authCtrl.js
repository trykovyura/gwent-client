app.controller('authCtrl', function($scope, Auth, $ionicLoading, $ionicPopup, $state, $rootScope) {
    $scope.loginData = {
        username: '',
        password: ''
    };
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
        Auth.$unauth();
    };

    /**
     * Логин с паролем
     */
    $scope.authWithPassword = function () {
        $ionicLoading.show({
            template: ' <ion-spinner></ion-spinner>'
        });
        Auth.$authWithPassword({
            email    : $scope.loginData.username,
            password : $scope.loginData.password
        }).then(function(userData) {
            console.log(userData);
            $rootScope.login = userData.password.email;
            $state.go('app.profile');
        }, function (error) {
            $scope.showAlert(error);
        }).finally(function(){
            $ionicLoading.hide();
        });
    };
    // An alert dialog
    $scope.showAlert = function(message) {
        $ionicPopup.alert({
            title: 'Ошибка',
            template: message
        });
    };
});