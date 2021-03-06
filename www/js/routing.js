/**
 * App routing for states
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/auth');
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
        abstract : true,
        views: {
            'menuContent': {
                templateUrl: "js/desk/desk.html",
                controller: 'DeskCtrl'
            }
        }
    });
    $stateProvider.state('app.desk.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: "js/desk/tabs/home.html",
                controller: 'DeskCtrl'
            }
        }
    });
    $stateProvider.state('app.desk.cards', {
        url: '/cards',
        views: {
            'tab-cards': {
                templateUrl: "js/desk/tabs/cards.html",
                controller: 'cardsCtrl'
            }
        }
    });
    $stateProvider.state('app.desk.messages', {
        url: '/messages',
        views: {
            'tab-messages': {
                templateUrl: "js/desk/tabs/messages.html",
                controller: 'messagesCtrl'
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

    $stateProvider.state('app.security.resetPassword', {
        url: "/reset",
        views: {
            'menuContent@app': {
                templateUrl: "js/auth/security/reset/reset.html",
                controller: 'resetCtrl'
            }
        }
    });
});