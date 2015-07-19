/**
 * Спиннер
 */
app.factory('spinner', function($ionicLoading) {

    return {
        /**
         * Показать спиннер
         */
        show : function () {
            $ionicLoading.show({
                template: ' <ion-spinner></ion-spinner>'
            });
        },
        /**
         * Убарать спиннер
         */
        hide : function () {
            $ionicLoading.hide();
        }

    }
});