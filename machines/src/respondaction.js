// this demonstrates some parent service (authClientMachine) sending a 'CODE' event to the invoked
// authServiceMachine, and the authServiceMachine responding with a 'TOKEN' event


import { Machine, send } from 'xstate';


const authServiceMachine = Machine({
    initial: 'waitingForCode',
    states: {
        waitingForCode: {
            on: {
                CODE: {
                    actions: respond('TOKEN', { delay: 10 })
                }
            }
        }
    }
});


const authClientMachine = Machine({
    initial: 'idle',
    states: {
        idle: {
            on: { AUTH: 'authorizing' }
        },
        authorizing: {
            invoke: {
                id: 'auth-server',
                src: authServiceMachine
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
});

