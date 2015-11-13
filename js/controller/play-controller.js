/**
 * @ngdoc controller
 *
 * @name bowling.playCtrl
 * @description Main controller to manage bowling arena.
 *
 * @requires $scope
 * @requires game
 * @requires $state

 * @author Nitin mali
 */
bowling.controller('playCtrl', ['$scope', 'game', '$state', 'playService',
    function ($scope, game, $state, playService) {

        //get players from game provider
        $scope.players = game.players;

        //Should have atleast one player
        if ($scope.players.length === 0) {
            $state.go("/");
        }

        //To update flash screen
        $scope.flashScore = '-';

        //player ready to bowl
        $scope.currentPlayer = _.findWhere($scope.players, {id: game.activePlayer});

        $scope.getEmptyFrames = function () {
            return new Array(game.lastFrame);
        };

        /**
         * @ngdoc method
         * @name addPlayer
         * @description Adding new player
         *
         */
        $scope.addPlayer = function () {
            playService.addNewPlayer($scope.newPlayer);
        };

        //update game onces players is changes, incase if we have more controllers
        $scope.$watch('players', function () {
            game.players = $scope.players;
        });

        /**
         * @ngdoc method
         * @name getScore
         * @description Main function which will be called after bowl is clicked (bowled). Will add empty frame first
         * for updating scores if not already added.
         *
         * Will randomly pick number between 0 to remaining pins (10 is by default)
         *
         * WIll also set the frame type spare(1), strike(2) or else 0 and then calculate the score and call nextframe
         * if frame change or player change is required
         *
         *
         * @Param: mock is passed for testing if user wants to score strike or spare.
         *
         */

        $scope.getScore = function (mock) {

            //Check if frame is set to use
            if (!_.findWhere($scope.currentPlayer.frames, {no: game.frameInProgress})) {
                $scope.currentPlayer.frames = playService.addNewFrame($scope.currentPlayer.id)
            }

            //updated current player score
            $scope.currentPlayer = playService.addScore(mock);

            //get all player score
            $scope.scores = game.players;

            //flash score
            $scope.flashScore = $scope.currentPlayer.flashScore;
        }

    }]);