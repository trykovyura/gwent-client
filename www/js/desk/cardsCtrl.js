/**
 * Cards Ctrl for making move
 * @author trykov
 */
app.controller('CardsCtrl', function ($scope, cardService, wsService, $state) {

    $scope.deskCards = cardService.getDeskCards();

    $scope.moveCard = function (card) {
        console.log('move card ' + JSON.stringify(card));
        wsService.moveCard($scope.deskCards.indexOf(card));
        $state.go('desk');
    };
});