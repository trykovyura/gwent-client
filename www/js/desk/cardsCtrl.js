/**
 * Cards Ctrl for making move
 * @author trykov
 */
app.controller('CardsCtrl', function ($scope, cardService, wsService, $state, $ionicModal) {

    $scope.deskCards = cardService.getDeskCards();
    $scope.status =  $scope.status = wsService.getStatus();
    $scope.moveCard = function (card, position) {
        if (!position && card.position.length && card.position.length > 1) {
            $scope.showModal(card);
        } else {
            wsService.moveCard(card.id);
            $state.go('desk');
        }

    };
    $scope.$on('wsMessage', function () {
        $scope.status =  $scope.status = wsService.getStatus();
    });

    $scope.showModal = function (card) {
        $ionicModal.fromTemplateUrl('js/modal/position.html', {
            scope: $scope,
            animation: 'slide-in-up',
            card : card
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show()
        })
    };

    $scope.$on('$destroy', function () {
        if ($scope.modal) {
            $scope.modal.remove();
        }
    });


});