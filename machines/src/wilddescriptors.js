import { Machine } from 'xstate';


const quietMachine = Machine({
    id: 'quiet',
    initial: 'idle',
    states: {
        idle: {
            on: {
                WHISPER: undefined,
                // On any event besides a WHISPERA, transition to the 'disturbed' state
                '*': 'disturbed'
            }
        },
        disturbed: {}
    }
});


quieteMachine.transition(quietMachine.initialState, 'WHISPER');
// => State {value: 'idle' }

quietMachine.transition(quietMachine.initialState, 'SOME_EVENT');
// => State {value: 'disturbed' }