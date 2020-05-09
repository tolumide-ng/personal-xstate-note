import { Machine, interpret, send, sendParent } from 'xstate';

const minuteMachine = Machine({
    id: 'timer',
    initial: 'active',
    states: {
        active: {
            after: { 60000: 'finished' }
        },
        finished: {
            type: 'final'
        }
    }
});


const parentMachine = Machine({
    id: 'parent',
    initial: 'pending',
    states: {
        pending: {
            invoke: {
                src: minuteMachine,
                onDone: 'timesUp'
            }
        },
        timesUp: { type: 'final'}
    }
})