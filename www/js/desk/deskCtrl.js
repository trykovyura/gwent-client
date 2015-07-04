/**
 * Desk Ctrl for two players
 * @author trykov
 */
app.controller('DeskCtrl', function ($scope, $ionicModal, $resource, $state, wsService, $ionicPopup) {
    /**
     * Пропустить сброс карт
     */
    $scope.skip = function () {
        wsService.skip();
    };
    /**
     * Данные от сервера
     */
    $scope.data = wsService.getData();
    /**
     * Статус игры
     */
    $scope.status = wsService.getStatus();

    /**
     * Статус сброса карт
     */
    $scope.isPrepareState = wsService.isPrepareState();

    /**
     * Обновляем статус и данные при получении сообщения от вебсокета
     */
    $scope.$on('wsMessage', function () {
        $scope.$apply(function () {
            $scope.data = wsService.getData();
            $scope.status = wsService.getStatus();
            $scope.isPrepareState = wsService.isPrepareState();
            console.log('обработано сообщение');
            //Если получили сообщение - показываем
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
    /**
     * Обработка закрытия соединения
     */
    $scope.$on('wsClose', function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Внимание!',
            template: 'Связь прервалась!'
        });
        alertPopup.then(function(res) {
            $state.go('home');
        });
    });

    /**
     * Pull refresh метод
     */
    $scope.doRefresh = function () {
        $scope.data = wsService.getData();
        $scope.status = wsService.getStatus();
        $scope.$broadcast('scroll.refreshComplete');
    }
});