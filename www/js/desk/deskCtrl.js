/**
 * Desk Ctrl for two players
 * @author trykov
 */
app.controller('DeskCtrl', function ($scope, $ionicModal, $resource, $state, wsService, $ionicPopup) {
    /**
     * Имя кнопки
     * TODO пасс заточить на PLAY
     */
    $scope.skipButtonName = wsService.isPrepareState() ? 'Пропустить сброс карт' : 'Пасс';
    /**
     * Данные от сервера
     */
    $scope.data = wsService.getData();

    test();
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
            $scope.skipButtonName = wsService.isPrepareState() ? 'Пропустить сброс карт' : 'Пасс';
            test();
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
        $state.go('app.desk.messages');
    });

    /**
     * Pull refresh метод
     */
    $scope.doRefresh = function () {
        $scope.data = wsService.getData();
        $scope.status = wsService.getStatus();
        $scope.skipButtonName = wsService.isPrepareState() ? 'Пропустить сброс карт' : 'Пасс';
        test();
        $scope.$broadcast('scroll.refreshComplete');
    };

    /**
     * Пропустить сброс карт
     */
    $scope.skip = function () {
        if (wsService.isPrepareState()) {
            wsService.skip();
        } else {
            $ionicPopup.confirm({
                title: 'Закончить раунд?',
                template: 'Вы действительно хотите закончить раунд?'
            }).then(function(res) {
                if(res) {
                    wsService.pass();
                }
            });
        }
    };

    /**
     * Эксперементальная зона доски
     */
    function test() {
        if ($scope.data) {
            $scope.topDeskCards = $scope.data.section.top.cards.concat($scope.data.section.top.modifiers, $scope.data.section.top.globalModifiers);
            $scope.middleDeskCards = $scope.data.section.middle.cards.concat($scope.data.section.middle.modifiers, $scope.data.section.middle.globalModifiers);
            $scope.bottomDeskCards = $scope.data.section.bottom.cards.concat($scope.data.section.bottom.modifiers, $scope.data.section.bottom.globalModifiers);
            $scope.topEnemyDeskCards = $scope.data.enemySection.top.cards.concat($scope.data.enemySection.top.modifiers, $scope.data.enemySection.top.globalModifiers);
            $scope.middleEnemyDeskCards = $scope.data.enemySection.middle.cards.concat($scope.data.enemySection.middle.modifiers, $scope.data.enemySection.middle.globalModifiers);
            $scope.bottomEnemyDeskCards = $scope.data.enemySection.bottom.cards.concat($scope.data.enemySection.bottom.modifiers, $scope.data.enemySection.bottom.globalModifiers);
        }
    }

    $scope.timeout = function () {
        //if (wsService.isPrepareState()) {
        //    wsService.skip();
        //} else {
        //    wsService.pass();
        //}
    };


});