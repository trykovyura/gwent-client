/**
 * Home controller
 * @author trykov
 */
app.controller('HomeCtrl', function ($scope, $state, wsService) {

    /**
     * Кнопка играть/возобновить игру
     */
    $scope.play = function () {
        if (wsService.isConnected()) {
            $state.go('desk');
        } else {
            wsService.newConnection();
        }
    };

    /**
     * При открытии соединения переходим на доску
     */
    $scope.$on('wsOpen', function () {
        $state.go('desk');
    });

});