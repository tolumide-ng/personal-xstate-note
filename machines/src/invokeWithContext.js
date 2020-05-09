const timerMachine = Machine({
    id: 'timer',
    context: {
        duration: 1000
    }
});


const parentMachine = Machine({
    id: 'parent',
    initial: 'active',
    context: {
        customDuration: 3000
    },
    states: {
        active: {
            invoke: {
                id: 'timer',
                src: timerMachine,
                data: {
                    duration: (context, event) => context.customDuration
                }
            }
        }
    }
})



// OTHER FORMS OF PASSING CONTEXT TO MACHINES INVOKED WITH CONTEXT
// data: {
//     duration: (context, event) => context.customDuration,
//     foo: (context, event) => value
// }

// data: (context, event) => ({
//     duration: context.customDuration,
//     foo: event.value,
//     bar: 'static value'
//   })


