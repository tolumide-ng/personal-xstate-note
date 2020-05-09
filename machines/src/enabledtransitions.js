import { Machine } from 'xstate';



const wizardMachine = Machine({
    id: 'wizard',
    initial: 'open',
    states: {
        open: {
            initial: 'step1',
            states: {
                step1: {
                    on: {
                        NEXT: 'step2'
                    },
                    step2: {},
                    step3: {},
                },
            },
            on: {
                NEXT: 'goodbye',
                CLOSE: 'closed'
            }
        },
        goodbye: {
            on: { CLOSE: 'closed' },
        },
        closed: {
            type: 'final'
        }
    }
});


// {open: 'step1}
const { initialState } = wizardMachine;

// the NEXT transition defiend on 'open.step1'