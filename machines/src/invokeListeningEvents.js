import { send } from "xstate";

const pingPongMachine = Machine({
    id: 'pinger',
    initial: 'active',
    states: {
        active: {
            invoke: {
                id: 'ponger',
                src: (context, event) => (callback, onReceive) => {
                    onReceive(e =>
                    {
                        if (e.type === 'PING') {
                            callback('PONG')
                        }
                    });
                }
            },
            entry: send('PING', { to: 'ponger' }),
            on: {
                PONG: 'done'
            },
            done: {
                type: 'final'
            }
        }
    }
})
