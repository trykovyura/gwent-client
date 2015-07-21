/**
 * Cards Ctrl for making move
 * @author trykov
 */
app.controller('cardsCtrl', function ($scope, cardService, wsService, $state, $ionicModal, $ionicPopup) {
    /**
     * Карты игрока
     */
    $scope.playerCards = cardService.getPlayerCards();
    
    $scope.deskCards = cardService.getDeskCards();
    
    /**
     * Статус игры
     */
    $scope.status = wsService.getStatus();

    /**
     * Сделать ход
     * @param card карта для хода
     * @param position позиция карты
     * @param additionalCardId идентификатор дополнительной карты
     */
    $scope.moveCard = function (card, position, additionalCardId) {
        $scope.card = card;
                //режим сброса карт
        if (wsService.isPrepareState()) {
            wsService.dropCard(card);
            if (!wsService.isPrepareState()) {
                //TODO не переходить если наш ход
                $state.go('app.desk.home');
            }

        } else { // режим игры
            if (!position && card.position.length && card.position.length > 1) {
                console.log('Не указана позиция')
            } else {
                console.log(card);
                wsService.moveCard(card, position, additionalCardId? additionalCardId : null);
                $state.go('app.desk.home');
            }
        }
    };
    /**
     * Обновляем статус в хедере
     */
    $scope.$on('wsMessage', function () {
        $scope.$apply(function () {
            $scope.status = wsService.getStatus();
            if (wsService.isPrepareState()) {
                $scope.deskCards = cardService.getDeskCards();
            }
        });
    });


});