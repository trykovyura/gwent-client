/**
 * Messages controller
 * @author trykov
 */
app.controller('messagesCtrl', function ($scope, $state, wsService) {
    
    $scope.messages = wsService.getMessages();
    /**
     * При открытии соединения переходим на доску
     */
    $scope.$on('wsOpen', function () {
        //TODO Когда найден соперник
        //$state.go('app.desk.home');
    });
    /**
     * Обновляем статус и данные при получении сообщения от вебсокета
     */
    $scope.$on('wsMessage', function () {
        $scope.$apply(function () {
            $scope.messages = wsService.getMessages();
        });
    });
});
