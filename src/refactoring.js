'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=> {
    game.start();
});

const game = new GameBuilder()
    .gameDuration(5)
    .carrotCount(5)
    .bugCount(5)
    .build();

game.setGameStopListener(reason => {
    let message;
    switch(reason) {
        case Reason.cancel :
            message = 'Replay❓';
            sound.playAlert();
            break;
        case Reason.win :
            message = 'You won!🎉';
            sound.playWin();
            break;
        case Reason.lose :
            message = 'You lost!💣';
            sound.playBug();
            break;
        default :
            throw new Error ('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});