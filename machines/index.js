import { Machine } from 'xstate'


const lightMachine = Machine({
    // Machine identifier
    id: 'light',

    // Initial state
    initial: 'green',

    // local context for entire machine
    context: {
        elapsed: 0,
        direction: 'east'
    },

    // State definitions
    states: {
        green: {
            entry: 'alertgreen'
        },
        yellow: {},
        red: {}
    },
}, {
        actions: {
        // action implementation
            alertGreen: (context, event) => {
                alert('Green');
            }
        },
        activities: {},
        guards: {},
        services: {},

})




// EXTENDING MACHINES
const noAlertLightMachine = lightMachine.withConfig({
    actions: {
        alertGreen: (context, event) => {
            console.log('green')
        }
    }
})



// EXTENDING CONTEXTS
    // this will overwrite existing context
const testLightMachine = lightMachine.withContext({
    elpased: 1000,
    direction: 'north'
})

    // this will merge with existing context
const testligh = lightMachine.withContext({
    ...lightMachine.context,
    elapsed: 1000
})