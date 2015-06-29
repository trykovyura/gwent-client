/**
 * Websocket service
 */
app.factory('wsService', function($websocket, $rootScope, cardService, $ionicPopup) {
    var ws;
    var data;
    //Не сбрасывать карты
    var isSkiped;
    return {
        /**
         * init connection with ws
         * Such constructor for chrome bug
         * protocols must be empty array
         * https://github.com/wilk/ng-websocket/issues/11
         */
        newConnection : function () {
            ws = $websocket.$new({
                url: 'ws://localhost:8080/server-1.0-SNAPSHOT/gwent',
                lazy: false,
                reconnect: false,
                reconnectInterval: 2000,
                enqueue: false,
                mock: false,
                protocols: []
            });
            //открылось соедиение
            ws.$on('$open', function () {
                $rootScope.$broadcast('wsOpen');
            });
            //получили сообщение
            ws.$on('$message', function (result){
                if (angular.isObject(result)) {
                    data = result;
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Внимание!',
                        template: result
                    });
                }

                if (result && result.hand) {
                    cardService.setDeskCards(result.hand);
                }
                $rootScope.$broadcast('wsMessage');
            });
            //закрылось соединение
            ws.$on('$close', function () {
                cardService.clearDeskCards();
                $rootScope.$broadcast('wsClose');
            });
        },
        /**
         * Make a move with card
         * @param cardId Card index
         */
        moveCard : function (cardId, position) {
            ws.$emit('PLAY', {'id' : cardId, 'position' : position});
        },
        /**
         * Пропускаем сброс карт
         */
        skip : function () {
            if (ws && !isSkiped) {
                ws.$emit('SKIP_DROP');
                isSkiped = true;
            }
        },
        /**
         * Статус сброса карт
         */
        isSkiped : function () {
            return isSkiped;
        },

        /**
         * Данные, полученные от вебсокета, обновляем их в сервисе, чтобы были доступны по всех scope
         */
        getData : function () {
            return data;
        },
        /**
         * Возвращает статус игры
         * @returns {string} статус
         */
        getStatus : function () {
            return data ? (data.activePlayerId == data.playerId) ? 'Ваш ход': 'Ожидание хода соперника' : 'Ожидание соперника';
        }
    };
});
