import { Machine } from 'xstate'

const lightMachine = Machine({
    // not parallel machine
    id: 'light',
    initial: 'green',
    states: {
        green: {
            on: { TIMER: 'yellow' }
        },
        yellow: {
            on: { TIMER: 'red' }
        },

        // nested parallel machine
        red: {
            type: 'parallel',
            states: {
                walkSign: {
                    initial: 'solid',
                    states: {
                        solid: {
                            on: { COUNTDOWN: 'flashing' },
                        },
                        flashing: {
                            on: { STOP_COUNTDOWN: 'solid' }
                        }
                    }
                },
                pedestrian: {
                    initial: 'walk',
                    states: {
                        walk: {
                            on: { COUNTDOWN: 'wait' }
                        },
                        wait: {
                            on: { STOP_COUNTDOWN: 'stop' }
                        },
                        stop: {
                            type: 'final'
                        }
                    }
                }
            }
        }
    }
});



console.log(lightMachine.transition('yellow', 'TIMER').value);


