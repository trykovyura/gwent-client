/**
 * App routing for states
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    /**
     * Home state, opens window modal
     */
    $stateProvider.state('app', {
        url: '/home',
        templateUrl: 'js/home.html',
        controller: 'HomeCtrl'
    });

    /**
     * Desk state for game, make move, watch enemy
     */
    $stateProvider.state('app.desk', {
        url: '/desk',
        views: {
            'menuContent': {
                templateUrl: "js/desk/desk.html",
                controller: 'DeskCtrl'
            }
        }
    });

    /**
     * Cards for desk to make a move
     */
    $stateProvider.state('cards', {
        url: '/cards',
        templateUrl: 'js/desk/cards2.html',
        controller: 'CardsCtrl'
    });

    /**
     * Rules state
     */
    $stateProvider.state('app.rules', {
        url: '/rules',
        views: {
            'menuContent': {
                templateUrl: "js/rules/rules.html",
                controller: 'RulesCtrl'
            }
        }
    });

    $stateProvider.state('app.auth', {
        url: "/auth",
        views: {
            'menuContent': {
                templateUrl: "js/auth/auth.html",
                controller: 'authCtrl'
            }
        }
    });

    $stateProvider.state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "js/auth/profile.html",
                controller: 'authCtrl'
            }
        }
    });

    $stateProvider.state('app.registration', {
        url: "/registration",
        views: {
            'menuContent': {
                templateUrl: "js/auth/registration/registration.html",
                controller: 'registrationCtrl'
            }
        }
    });

    $stateProvider.state('app.security', {
        url: "/security",
        views: {
            'menuContent': {
                templateUrl: "js/auth/security/security.html",
                controller: 'securityCtrl'
            }
        }
    });

    $stateProvider.state('app.security.changePassword', {
        url: "/change",
        views: {
            'menuContent@app': {
                templateUrl: "js/auth/security/change/change.html",
                controller: 'changeCtrl'
            }
        }
    });
});