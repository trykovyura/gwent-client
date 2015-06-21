/**
 * Websocket service
 */
app.factory('wsService', function($websocket, $rootScope, cardService, $ionicPopup) {
    var ws;
    var data;
    return {
        /**
         * init connection with ws
         * Such constructor for chrome bug
         * protocols must be empty array
         * https://github.com/wilk/ng-websocket/issues/11
         */
        newConnection : function () {
            lastMessageData = null;
            console.log('ws newConnection');
            ws = $websocket.$new({
                url: 'ws://localhost:8080/server-1.0-SNAPSHOT/gwent',
                lazy: false,
                reconnect: false,
                reconnectInterval: 2000,
                enqueue: false,
                mock: false,
                protocols: []
            });
            ws.$on('$open', function () {
                $rootScope.$broadcast('wsOpen');
            });
            ws.$on('$message', function (result){
                if (angular.isObject(result)) {
                    data = result;
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Ошибка!',
                        template: result
                    });
                }


                if (result && result.hand) {
                    cardService.setDeskCards(result.hand);
                }
                $rootScope.$broadcast('wsMessage');
            });
            ws.$on('$close', function () {
                cardService.clearDeskCards();
                $rootScope.$broadcast('wsClose');
            });
            return ws;
        },
        /**
         * Make a move with card
         * @param index index of a card 0-9
         */
        moveCard : function (index) {
            console.log('moveCard card index ' + index);
            if (index >= 0 && index < 10) {
                ws.$emit('play ' + index);
            } else {
                console.log('incorrect index ' + index)
            }
        },

        getData : function () {
            return data;
        }
    };
});
