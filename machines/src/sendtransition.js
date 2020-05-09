import { Machine, send } from 'xstate';

const lazyStubbotnMachine = Machine({
    id: 'stubborn',
    initial: 'inactive',
    states: {
        inactive: {
            on: {
                TOGGLE: {
                    target: 'active',
                    actions: send['TOGGLE']
                }
            }
        },
        active: {
            on: {
                TOGGLE: 'inactive'
            }
        }
    }
});


const nextState = lazyStubbotnMachine.transition('inactive', 'TOGGLE');

nextState.value;
// => 'active'

nextState.actions;
// => [{type: 'xstate.send', event: {type: 'TOGGLE'}}]
// the service will proceed to send itself the {type: 'TOGGLE' } event.

