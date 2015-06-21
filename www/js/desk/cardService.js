/**
 * Card service
 */
app.factory('cardService', function() {
   var deskCards;

    return {
        /**
         * Getter for desk cards from ws
         */
        getDeskCards : function () {
            return deskCards;
        },
        /**
         * Setter for desk cards from ws
         */
        setDeskCards : function (newValue) {
            deskCards = newValue;
        },

        clearDeskCards : function () {
            deskCards = null;
        }

    }
});