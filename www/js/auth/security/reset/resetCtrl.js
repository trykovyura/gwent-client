/**
 * Регистрация пользователя
 */
app.controller('resetCtrl', function ($scope, $state, spinner, $ionicPopup, $rootScope, Auth) {
    $scope.loginData = {
        username: ''
    };
    $scope.resetPassword = function () {
        spinner.show();
        Auth.$resetPassword({
            email: $scope.loginData.username
        }).then(function () {
            $scope.showAlert('Внимание', 'На электронный адрес ' + $scope.loginData.username +
                ' отправлено письмо с инструкцией для восстановления').then(function () {
                $state.go('app.auth');
            });
        }, function (error) {
            $scope.showAlert('Ошибка', error);
        }).finally(function () {
            spinner.hide();
        });
    };

    // An alert dialog
    $scope.showAlert = function (header, message) {
        return $ionicPopup.alert({
            title: header,
            template: message
        });
    };

});