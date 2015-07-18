/**
 * Регистрация пользователя
 */
app.controller('changeCtrl', function($scope, $state, $ionicLoading, $ionicPopup, $rootScope, Auth) {
    $scope.loginData = {
        username: $rootScope.login,
        oldPassword: '',
        newPassword: '',
        confirmPassword :''
    };
    $scope.changePassword = function(form) {
        form.newPassword.$setValidity("equals", true);
        form.confirmPassword.$setValidity("equals", true);
        if ($scope.loginData.newPassword !== $scope.loginData.confirmPassword){
            form.newPassword.$setValidity("equals", false);
            form.confirmPassword.$setValidity("equals", false);
            return;
        }
        $ionicLoading.show({
            template: ' <ion-spinner></ion-spinner>'
        });
        Auth.$changePassword({
            email    : $scope.loginData.username,
            oldPassword : $scope.loginData.oldPassword,
            newPassword : $scope.loginData.newPassword
        }).then(function(userData) {
            $state.go('^');
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