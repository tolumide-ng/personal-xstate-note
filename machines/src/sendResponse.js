import { Machine, send, actions } from 'xstate';

const { respond } = actions;

const authServerMachine = Machine({
    id: 'server',
    initial: 'waitingForCode',
    states: {
        waitingForCode: {
            on: {
                CODE: {
                    actions: respond('TOKEN', { delay: 1000 })
                }
            }
        }
    }
});



const authClientMachine = Machine({
    id: 'client',
    initial: 'idle',
    states: {
        idle: {
            on: {AUTH: 'authorizing'}
        },
        authorizing: {
            invoke: {
                id: 'auth-server',
                src: authServerMachine
            },
            entry: send('CODE', { to: 'auth-server' }),
            on: {
                TOKEN: 'authorized'
            }
        },
        authorized: {
            type: 'final'
        }
    }
})