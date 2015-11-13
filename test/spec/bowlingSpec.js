/**
 * Created by Nitin on 08-11-2015.
 */
describe('Testing bowling spec', function(){
    var playService, game;

    beforeEach(function(){
        module('bowling');
        inject(function($injector){
            playService = $injector.get('playService');
            game = $injector.get('game');
        });
    });

    it('0 players before the game ', function(){
        expect(game.players.length).toEqual(0);
    });

    it('Add new player "Test"', function(){
        playService.addNewPlayer('Test');
        playService.addNewPlayer('Second');
        expect(game.players.length).toEqual(1);
        expect(game.players[0].name).toEqual('Test');
    });

    it('Add empty frame', function(){
        //Check if frame is set to use
        if (!_.findWhere(game.players[0].frames, {no: game.frameInProgress})) {
            game.players[0].frames = playService.addNewFrame(game.players[0].id);
        }
        expect(game.players[0].frames.length).toEqual(1);
    });

    it('Add 3,4 to 1st frame and total score should be 7', function(){
        playService.addScore({test: 3});
        playService.addScore({test: 4});

        expect(game.players[0].total).toEqual(7);
    });

    it('Add 4,5 to 2nd frame and total score should be 16', function(){
        //Add 2nd frame
        game.players[0].frames = playService.addNewFrame(game.players[0].id);

        playService.addScore({test: 4});
        playService.addScore({test: 5});

        expect(game.players[0].total).toEqual(16);
    });

    it('Strike on 3rd frame and 3rd frame now should be 26 before 2 bonus', function(){
        //Add 2nd frame
        game.players[0].frames = playService.addNewFrame(game.players[0].id);
        playService.addScore(1);

        expect(game.players[0].frames[2].total).toEqual(26);
    });

    it('Spare [4,6] on 4th frame and 3rd frame now should be 36 after 2 bonus', function(){
        //Add 2nd frame
        game.players[0].frames = playService.addNewFrame(game.players[0].id);
        playService.addScore(1);

        expect(game.players[0].frames[2].total).toEqual(36);
    });

});