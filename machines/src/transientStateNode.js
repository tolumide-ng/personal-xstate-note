import { Machine, interpret } from 'xstate';

const timeOfDayMachine = Machine({
    id: 'timeOfDay',
    initial: 'unknown',
    context: {
        time: undefined
    },
    states: {
        // Transcient state
        unknown: {
            on: {
                "": [
                    { target: 'morning', cond: 'isBeforeNoon' },
                    { target: 'afternoon', cond: 'isBeforeSix' },
                    { target: 'evening' }
                ]
            }
        },
        morning: {},
        afternoon: {},
        evening: {}
    }
}, {
    guards: {
        isBeforeNoon: {},
        isBeforeSix: {}
    }
});




const timeOfDayService = interpret(
    timeOfDayMachine.withContext({ time: Date.now() })
        .onTransition(state => console.log(state.value))
        .start()
)