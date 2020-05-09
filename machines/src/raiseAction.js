import { Machine, actions } from 'xstate';
const { raise } = actions;


const stubbornMachine = Machine({
    id: 'stubborn',
    initial: 'inactive',
    states: {
        inactive: {
            on: {
                TOGGLE: {
                    target: 'active',
                    // immediately consume the toggle event
                    actions: raise('TOGGLE')
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

const nextState = stubbornMachine.transition('inactive', 'TOGGLE');

nextState.value;
// => 'inactive'
nextState.actions;
// => [] remmeber, there are no actions on the 'active' state
