/**
 * Desk Ctrl for two players
 * @author trykov
 */
app.controller('DeskCtrl', function ($scope, $ionicModal, $resource, $state, wsService, $ionicPopup) {
    $scope.myCards = function () {
        $state.go('cards');
    };
    /**
     * Mock method for test
     */
    $scope.move = function () {
        wsService.moveCard(0);
    };

    $scope.data = wsService.getData();
    $scope.status = wsService.getStatus();
    $scope.$on('wsMessage', function () {
        $scope.$apply(function () {
            $scope.data = wsService.getData();
            $scope.status = wsService.getStatus();
            console.log('обработано сообщение');
            if ($scope.data && $scope.data.error) {
                // An alert dialog
                var alertPopup = $ionicPopup.alert({
                    title: 'Ошибка!',
                    template: $scope.data.error
                });
                alertPopup.then(function(res) {
                    console.log('Обработали нажатие алерта');
                });
            }
        });
    });
    $scope.$on('wsOpen', function () {
        console.log('Oh my gosh, websocket is really open! Fukken awesome!');
    });
    $scope.$on('wsClose', function () {
        console.log('Noooooooooou, ws closed!');
        var alertPopup = $ionicPopup.alert({
            title: 'Извините!',
            template: 'Связь прервалась. Ищите другого соперника'
        });
        alertPopup.then(function(res) {
            $state.go('home');
        });
    });

    $scope.doRefresh = function () {
        $scope.data = wsService.getData();
        $scope.status = wsService.getStatus();
        $scope.$broadcast('scroll.refreshComplete');
    }
});