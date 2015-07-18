/**
 * App module
 * @author trykov
 */
var app = angular.module('starter', ['ionic', 'ngResource', 'ui.router', 'ngWebsocket', 'timer', 'firebase']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

/**
 * App configuration
 */
app.config(function ($ionicConfigProvider, $websocketProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
    $websocketProvider.$setup({
        lazy: false,
        reconnect: true,
        reconnectInterval: 2000,
        mock: false,
        enqueue: false
    });
});