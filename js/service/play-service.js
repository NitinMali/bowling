/**
 * Created by Nitin on 07-11-2015.
 */

bowling.service("playService", ['game', function(game){

    var currentFrame = [], previousFrames = [];
    var currentPlayer;

    /**
     * @ngdoc method
     * @name nextPlayer
     * @description This method will call next player or finish the game
     *
     */
    function nextPlayer(){
        //if last player
        if (game.players.length === currentPlayer.id) {
            //last frame
            if (game.frameInProgress === game.lastFrame) {
                currentPlayer.flashScore = "Bye"
            } else {
                game.frameInProgress = game.frameInProgress + 1;
                game.activePlayer = 1;
            }
        } else {
            //else next player
            game.activePlayer++;
        }

        //new set of pins
        currentPlayer.remainingPins = 10;
        //check if player is changed
        currentPlayer = _.findWhere(game.players, {id: game.activePlayer});
    }
    /**
     * @ngdoc method
     * @name getUpdatedScores
     * @description will add bonus to previous frames if required and recalculate the score
     *
     * returns updated score
     *
     */
    function getUpdatedScores(score) {
        var totalScore = 0;

        _.each(previousFrames, function (frame) {
            if(frame.status===0) {
                //add bonus score to try array
                frame.try.push(score);
                //if all bonus score is added then set frame status to complete(1)
                if (frame.try.length === 3) {
                    //set to complete if bonus scores are added to frame
                    frame.status = 1;
                }
            }

            //recalculate frame scores
            frame.total = totalScore + _.reduce(frame.try,
                function (memo, score) {
                    return memo + score.num;
                }, 0);

            totalScore = frame.total;
        });

        //add current frame scores
        totalScore = totalScore +  _.reduce(currentFrame.try,
            function (memo, score) {
                return memo + score.num;
            }, 0);

        return totalScore;
    }

    function addScore(mock){
        //current frames details
        currentFrame = _.last(currentPlayer.frames);

        //previous frames
        previousFrames = _.filter(currentPlayer.frames, function (frame) {
            if (frame.no !== game.frameInProgress) {
                return true;
            } else {
                return false;
            }
        });

        var isTheLastFrame = false;

        if(currentFrame.no === game.lastFrame) {
            isTheLastFrame = true;
        }

        //roll the bowl
        var min = 0;
        var remain = currentPlayer.remainingPins;
        var down = Math.floor(Math.random() * (remain - min + 1) + min);

        //mock results for testing
        if (mock === 1) {
            down = currentPlayer.remainingPins;
        }

        //for jasmine test
        if(mock.test) {
            down = mock.test;
        }

        //save the score in current frame
        currentFrame.try.push({num: down, print: down, bonus:false});

        //update remaining pins
        currentPlayer.remainingPins = currentPlayer.remainingPins - down;

        currentFrame.total = getUpdatedScores({num: down, print: down, bonus:true});

        //Player total score
        currentPlayer.total = currentFrame.total;

        //If all pins are down
        if (currentPlayer.remainingPins === 0) {
            //check for spare or strike
            if (currentFrame.try.length === 1) {
                //Strike
                currentFrame.type = 2;
                currentFrame.try[0].print = 'X';
            } else {
                //change only if type is not already updated , avoiding last frame double strike would leed to spare
                if(currentFrame.type === 0) {
                    //Spare
                    currentFrame.type = 1;
                    currentFrame.try[1].print = '/';
                }

            }

            //Update flash score view
            currentPlayer.flashScore = _.last(currentFrame.try).print;

            //Call nextPLayer if this not last last frame or if its last frame then check if both bonus are added
            if(!isTheLastFrame || currentFrame.try.length>2) {
                nextPlayer();
            } else {
                //reset pins
                currentPlayer.remainingPins = 10;
            }

        } else {
            //Update flash score view
            currentPlayer.flashScore = _.last(currentFrame.try).print;

            //Call next player if currentframe is either spare or strike and both bonus are added or
            //if its normal frame and both chances are done.
            if ((currentFrame.type!==0 && currentFrame.try.length > 2) ||
                (currentFrame.type===0 && currentFrame.try.length > 1)) {
                currentFrame.status = 1;
                nextPlayer();
            }
        }

        return currentPlayer;

    }

    return {
        addNewPlayer: function(playName){
            //remainingPins will be updated during players game and frames[] will store every
            //frame score details. Total is player's total score.
            game.players.push({
                id: game.players.length + 1, name: playName,
                remainingPins: 10,
                frames: [],
                total: 0
            });
        },

        addNewFrame: function(playerId){
            /*set frame for use: no: current frame number, try: tries in current frame,
             type: type of frame strike(2), spare(1) & normal(0)
             status: flag if frame calculation is finished(1) or pending(0)
             total: frame total
             */
            game.players[playerId-1].frames.push({
                no: game.frameInProgress,
                try: [],
                type: 0,
                status: 0,
                total: 0
            });

            return game.players[playerId-1].frames;
        },

        getUpdatedScore: function(score){
            return getUpdatedScores(score);
        },

        addScore: function(mock){
            currentPlayer = _.findWhere(game.players, {id: game.activePlayer});
            return addScore(mock);
        }


    }
}]);