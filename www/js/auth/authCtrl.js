app.controller('authCtrl', function($scope, Auth, spinner, $ionicPopup, $state, $rootScope, wsService) {
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
        $rootScope.authData = authData;
    });
    $scope.logout = function () {
        Auth.$unauth();
        $rootScope.authData = null;
        $state.go('app.auth');
    };

    /**
     * Логин с паролем
     */
    $scope.authWithPassword = function () {
        spinner.show();
        Auth.$authWithPassword({
            email    : $scope.loginData.username,
            password : $scope.loginData.password
        }).then(function(userData) {
            console.log(userData);
            $rootScope.login = userData.password.email;
            $rootScope.authData = userData;
            $state.go('app.profile');
        }, function (error) {
            $scope.showAlert(error);
        }).finally(function(){
            spinner.hide();
        });
    };
    // An alert dialog
    $scope.showAlert = function(message) {
        $ionicPopup.alert({
            title: 'Ошибка',
            template: message
        });
    };
    
    /**
     * Кнопка играть/возобновить игру
     */
    $scope.play = function () {
        if (wsService.isConnected()) {
            $state.go('app.desk.messages');
        } else {
            wsService.newConnection();
            $state.go('app.desk.messages');
        }
    };
});