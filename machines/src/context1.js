import { Machine, assign } from 'xstate';

// Action to increment the context amount
const addWater = assign({
    amount: (context, event) => context.amount + 1
});

// Guard to check if the glass is full
function glassIsFull (context, event) {
    context.amount >= 10
}


const glassMachine = Machine({
    id: 'glass',
    context: {
        amount: 0
    },
    initial: 'emoty',
    states: {
        empty: {
            on: {
                FILL: {
                    target: 'filling',
                    actions: 'addWater'
                }
            }
        },
        filling: {
            on: {
                '': {
                    target: 'full',
                    cond: 'glassIsFull'
                },
                FILL: {
                    target: 'filling',
                    actions: 'addWater'
                }
            }
        },
        full: {}
    }
}, {
    actions: { addWater },
    guards: {glassIsFull}
})