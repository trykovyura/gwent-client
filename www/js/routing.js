/**
 * App routing for states
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    /**
     * Home state, opens window modal
     */
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home.html',
        controller: 'HomeCtrl'
    });

    /**
     * Desk state for game, make move, watch enemy
     */
    $stateProvider.state('desk', {
        url: '/desk',
        templateUrl: 'js/desk/desk.html',
        controller: 'DeskCtrl'
    });

    /**
     * Cards for desk to make a move
     */
    $stateProvider.state('cards', {
        url: '/cards',
        templateUrl: 'js/desk/cards.html',
        controller: 'CardsCtrl'
    });

    /**
     * Rules state
     */
    $stateProvider.state('rules', {
        url: '/rules',
        templateUrl: 'js/rules/rules.html',
        controller: 'RulesCtrl'
    });
});