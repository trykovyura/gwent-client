/**
 * Home controller
 * @author trykov
 */
app.controller('HomeCtrl', function ($scope, $ionicModal, $resource, $state, wsService, cardService) {

    $scope.play = function () {
        wsService.newConnection();
    };

    /**
     * При открытии соединения переходим на доску
     */
    $scope.$on('wsOpen', function () {
        $state.go('desk');
    });

});