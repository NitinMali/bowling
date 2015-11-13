//Initialising angular app
var bowling = angular.module('bowling', ['ui.router']);

//Route setting
bowling.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                controller: 'playCtrl',
                templateUrl: 'views/index.html'
            })
            .state('play', {
                url: '/play',
                controller: 'playCtrl',
                templateUrl: 'views/play.html'
            })
});

//Will be used as service , game provider will be included in play controller
bowling.value("game", {frameInProgress: 1, lastFrame:5 , activePlayer: 1, players: []});