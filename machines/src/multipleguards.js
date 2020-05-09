import { Machine, actions, interpret, assign } from 'xstate'


const doorMachine = Machine({
    id: 'door',
    initial: 'closed',
    context: {
        level: 'user',
        alert: false //alert when intrusions happen
    },
    states: {
        closed: {
            initial: 'idle',
            states: {
                idle: {},
                error: {}
            },
            on: {
                SET_ADMIN: {
                    actions: assign({level: 'admin'})
                },
                SET_ALARM: {
                    actions: assign({alert: true})
                },
                OPEN: [
                    // Transitions are tested one at a time
                    // The first valid transition will be taken.
                    { target: 'opened', cond: 'isAdmin' },
                    { target: '.error', cond: 'shouldAlert' },
                    {target: '.idle'}
                ]
            }
        },
        opened: {
            on: {
                CLOSED: 'closed'
            }
        }
    }
}, {
        gaurds: {
            isAdmin: context => context.level === 'admin',
            shouldAlert: context => context.alert === true
    }
})