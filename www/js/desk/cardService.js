/**
 * Card service
 */
app.factory('cardService', function() {
    var deskCards;
    var playerCards;
    return {
        /**
         * Getter for desk cards from ws
         */
        getPlayerCards : function () {
            return playerCards;
        },
        /**
         * Setter for desk cards from ws
         */
        setPlayerCards : function (newValue) {
            playerCards = newValue;
        },

        clearPlayerCards : function () {
            playerCards = null;
        },
        /**
         * Установить свои карты  на доске
         * @param section секция - top, middle, bottom
         * @returns {*}
         */
        setDeskCards : function (section) {
            if (!section){
                return;
            }
            deskCards = [].concat(section.top.cards).concat(section.middle.cards).concat(section.bottom.cards);
        },
        
        getDeskCards : function () {
            return deskCards;
        }

    }
});