import { Machine, interpret } from 'xstate';
import { assign } from 'xstate/lib/actionTypes';

const gameMachine = Machine({
    id: 'game',
    initial: 'playing',
    context: {
        points: 0
    },
    states: {
        playing: {
            on: {
                '': [
                    { target: 'win', cond: 'didPlayerWin' },
                    { target: 'lose', cond: 'didPlayerLose' }
                ],
                // Self-transition
                AWARD_POINTS: {
                    actions: assign({
                        points: 100
                    })
                }
            }
        },
        win: { type: 'final' },
        lose: { type: 'final' }
    }
}, {
    guards: {
        didPlayerWin: (context, event) =>
        {
            // check if player won
            return context.points > 99;
        },
        didPlayerLose: (context, event) =>
        {
            // checkif player lost
            return context.points < 0;
        }
    }
});



const gameService = interpret(gameMachine).onTransition(state => console.log(state.value)).start();

// Still in 'playing' state because no conditions of transcient were mer=> 'playing' 

// When "Award_points" is sent, a self_transition to 'PLAYING' occurs.
gameService.send('AWARD_SERVICE');
// => 'win'

