import { sendParent } from "xstate";

const remoteMachine = Machine({
    id: 'remote',
    initial: 'offline',
    states: {
        offline: {
            on: {
                WAKE: 'online'
            }
        },
        online: {
            after: {
                1000: {
                    actions: sendParent('REMOTE-ONLINE')
                }
            }
        }
    }
});


const parentMachine = Machine({
    id: 'parent',
    initial: 'waiting',
    context: {
        localOne: null
    },
    states: {}
})