/**
 * Websocket service
 */
app.factory('wsService', function($websocket, $rootScope, cardService, $ionicPopup) {
    var ws;
    var data;
    //Не сбрасывать карты
    var isSkiped;
    //Отправленные и полученные сообщения
    var messages = [];
    return {
        /**
         * init connection with ws
         * Such constructor for chrome bug
         * protocols must be empty array
         * https://github.com/wilk/ng-websocket/issues/11
         */
        newConnection : function () {
            if (!ws) {
                ws = $websocket.$new({
                    url: 'ws://localhost:8080/server-1.0-SNAPSHOT/gwent',
                    lazy: false,
                    reconnect: false,
                    reconnectInterval: 2000,
                    enqueue: false,
                    mock: false,
                    protocols: []
                });
                console.log(ws.$status());
            } else {
                ws.$open();
            }
            //открылось соедиение
            ws.$on('$open', function () {
                messages.push({time: Date.now(), text:'Соединение с сервером установлено'});
                $rootScope.$broadcast('wsOpen');
            });
            //получили сообщение
            ws.$on('$message', function (result){
                if (angular.isObject(result)) {
                    data = result;
                    messages.push({time: Date.now(), text:'Получен ответ с сервера'});
                } else {
                    messages.push({time: Date.now(), text:result});
                }

                if (result && result.hand) {
                    cardService.setPlayerCards(result.hand);
                }
                if (result && result.section) {
                    cardService.setDeskCards(result.section);
                }
                $rootScope.$broadcast('wsMessage');
            });
            //закрылось соединение
            ws.$on('$close', function () {
                cardService.clearPlayerCards();
                messages.push({time: Date.now(), text:'Соединение с сервером закрыто'});
                $rootScope.$broadcast('wsClose');
            });
        },
        /**
         * Make a move with card
         * @param card Card
         * @param position Позиция для хода
         * @param additionalCardId Идентификатор дополнительной карты
         */
        moveCard : function (card, position, additionalCardId) {
            messages.push({time: Date.now(), text:'Сделал ход картой ' + card.name + (additionalCardId ? 'Дополнительная информация ' + additionalCardId : '')});
            ws.$emit('PLAY', {'id' : card.id, 'position' : position, additional : {id : additionalCardId}});
        },
        /**
         * Пропускаем сброс карт
         */
        skip : function () {
            if (ws && !isSkiped) {
                messages.push({time: Date.now(), text:'Пропустить сброс карт'});
                ws.$emit('SKIP_DROP');
                isSkiped = true;
            }
        },
        /**
         * Сделать пасс(закончить раунд)
         */
        pass : function () {
            if (ws) {
                messages.push({time: Date.now(), text:'Пасс'});
                ws.$emit('PASS');
            }
        },
        /**
         * Сброс карты
         * @param card Идентификатор карты
         */
        dropCard: function (card) {
            if (ws && data && data.state === 'PREPARE') {
                messages.push({time: Date.now(), text:'Сброс карты ' + card.name});
                ws.$emit('DROP', {id : card.id});
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
        getStatus: function () {
            return data ? (data.activePlayerId === data.playerId) ? 'Ваш ход' : 'Ожидание хода соперника' : 'Ожидание соперника';
        },
        /**
         * Состояние стола
         */
        isPrepareState: function () {
            return data ? data.state === 'PREPARE' : false;
        },

        /**
         * Есть ли соединение с сервером ws
         */
        isConnected: function () {
            return ws ? ws.$status() === ws.$OPEN : false;
        },
        
        getMessages: function () {
            return messages;
        }
    };
});
