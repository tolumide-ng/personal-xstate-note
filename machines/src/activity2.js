import { Machine } from "xstate";

const lightMachine = Machine({
    key: 'light',
    initial: 'green',
    states: {
        green: {
            on: {
                TIMER: 'yellow'
            }
        },
        yellow: {
            on: {
                TIMER: 'red'
            }
        },
        red: {
            initial: 'wait',
            activities: ['activateCrossWalkLight'],
            on: {
                TIMER: 'green'
            },
            states: {
                walk: {
                    on: {
                        PED_WAIT: 'wait'
                    }
                },
                stop: {}
            }
        }
    }
});