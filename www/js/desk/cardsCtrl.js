/**
 * Cards Ctrl for making move
 * @author trykov
 */
app.controller('CardsCtrl', function ($scope, cardService, wsService, $state, $ionicModal) {
    /**
     * Карты игрока
     */
    $scope.deskCards = cardService.getDeskCards();
    /**
     * Статус игры
     */
    $scope.status = wsService.getStatus();

    /**
     * Сделать ход
     * @param card карта для хода
     * @param position позиция карты
     */
    $scope.moveCard = function (card, position) {
        $scope.card = card;
                //режим сброса карт
        if (wsService.isPrepareState()) {
            wsService.dropCard(card.id);
        } else { // режим игры
            if (!position && card.position.length && card.position.length > 1) {
                $scope.showModal(card);
            } else {
                wsService.moveCard(card.id, position);
                $state.go('desk');
            }
        }

    };
    /**
     * Обновляем статус в хедере
     */
    $scope.$on('wsMessage', function () {
        $scope.status = wsService.getStatus();
        if (wsService.isPrepareState()) {
            $scope.deskCards = cardService.getDeskCards();
        }
    });

    /**
     * Открывает меню выбора позиции
     */
    $scope.showModal = function () {
        $ionicModal.fromTemplateUrl('js/modal/position.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    };

    /**
     * При смене состояния закрываем модальное окно
     */
    $scope.$on('$destroy', function () {
        if ($scope.modal) {
            $scope.modal.remove();
        }
        $scope.card = null;
    });


});