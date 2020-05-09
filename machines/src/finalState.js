import { Machine } from 'xstate';

const lightMachine = Machine({
    id: 'light',
    initial: 'green',
    states: {
        green: {
            on: { TIMER: 'yellow' }
        },
        yellow: {
            on: { TIMER: 'red' }
        },
        red: {
            type: 'parallel',
            states: {
                crosswalkNorth: {
                    initial: 'walk',
                    states: {
                        walk: {
                            on: {PED_WAIT: 'wait'}
                        },
                        wait: {
                            on: {PED_STOP: 'stop'}
                        },
                        stop: {
                            // 'stop' is a final state node for 'crosswalkNorth'
                            on: {type: 'final'}
                        }
                    },
                    onDone: {
                        actions: 'stopCrossWalkNorth'
                    }
                },
                crosswalkEast: {
                    initial: 'walk',
                    states: {
                        walk: {
                            on: { PED_WAIT: 'wait' },
                            wait: { PED_STOP: 'stop' },
                            stop: {type: 'final'}
                        }
                    },
                    onDone: {
                        actions: 'stopCrosswalkEast'
                    }
                }
            },
            onDone: 'green'
        }
    }
})