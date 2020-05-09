import { Machine } from 'xstate';


const promiseMachine = Machine({
    id: 'promise',
    initial: 'pending',
    states: {
        pending: {
            on: {
                // state transition (shorthand)
                // this is equivalent to {target: 'resolved' }
                RESOLVE: 'resolved',

                // state transition (object)
                REJECT: {
                    target: 'rejected'
                }
            }
        },
        resolved: {
            type: 'final'
        },
        rejected: {
            type: 'final'
        }
    }
});




const { initialState } = promiseMachine;

console.log(initialState.value);
// => 'pending'


const nextState = promiseMachine.transition(initialState, "RESOLVE");

console.log(nextState.value);
// => resolved