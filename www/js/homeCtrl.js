/**
 * Home controller
 * @author trykov
 */
app.controller('HomeCtrl', function ($scope, $ionicModal, $resource, $state, wsService, cardService) {

    $scope.play = function () {
        $scope.modal.hide();
        $scope.modal.remove();
        wsService.newConnection();
    };

    $scope.showModal = function () {
        $ionicModal.fromTemplateUrl('js/start/startMenu.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show()
        })
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    /**
     * При открытии соединения переходим на доску
     */
    $scope.$on('wsOpen', function () {
        $state.go('desk');
    });

    $scope.showModal();
});