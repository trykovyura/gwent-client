/**
 * Регистрация пользователя
 */
app.controller('registrationCtrl', function($scope, $state, spinner, $ionicPopup, Auth) {
    $scope.loginData = {
        username: '',
        password: '',
        confirmPassword :''
    };
    $scope.createUser = function(form) {
        form.password.$setValidity("equals", true);
        form.confirmPassword.$setValidity("equals", true);
        if ($scope.loginData.password !== $scope.loginData.confirmPassword){
            form.password.$setValidity("equals", false);
            form.confirmPassword.$setValidity("equals", false);
            return;
        }
        spinner.show();
        var create = Auth.$createUser({
            email    : $scope.loginData.username,
            password : $scope.loginData.password
        }).then(function(userData) {
            $state.go('app.auth');
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

});