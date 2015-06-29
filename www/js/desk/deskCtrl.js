/**
 * Desk Ctrl for two players
 * @author trykov
 */
app.controller('DeskCtrl', function ($scope, $ionicModal, $resource, $state, wsService, $ionicPopup) {
    /**
     * Переход к своей колоде
     */
    $scope.myCards = function () {
        $state.go('cards');
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
     * Обновляем статус и данные при получении сообщения от вебсокета
     */
    $scope.$on('wsMessage', function () {
        $scope.$apply(function () {
            $scope.data = wsService.getData();
            $scope.status = wsService.getStatus();
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
     * Обработка открытия соединения
     */
    $scope.$on('wsOpen', function () {
        console.log('Oh my gosh, websocket is really open! Fukken awesome!');
    });
    /**
     * Обработка закрытия соединения
     */
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

    /**
     * Pull refresh метод
     */
    $scope.doRefresh = function () {
        $scope.data = wsService.getData();
        $scope.status = wsService.getStatus();
        $scope.$broadcast('scroll.refreshComplete');
    }
});