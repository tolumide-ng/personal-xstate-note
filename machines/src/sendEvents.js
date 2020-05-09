/* 
  The send(...) and sendParent(...) action creators do not imperatively send events to
  machines. THEY ARE PURE FUNCTIONS that return an action object describing what is to be 
  sent, e.g., {type: 'xstate.send', event: ....}. An interpreter will read these objects
  and then send them.
*/


import { Machine, interpret, send, sendParent } from 'xstate';

// Parent MACHINE
const pingMachine = Machine({
    id: 'ping',
    initial: 'active',
    states: {
        active: {
            invoke: {
                id: 'pong',
                src: pongMachine
            },
            // Sends 'PING' event to child machine with ID 'ping'
            entry: send('PING', { to: 'pong' }),
            on: {
                PONG: {
                    actions: send('PING', {
                        to: 'pong',
                        delay: 1000
                    })
                }
            }
        }
    }
});


// Invoked child machine
const pongMachine = Machine({
    id: 'pong',
    initial: 'active',
    states: {
        active: {
            on: {
                PING: {
                    // sends 'PONG' event to parent machine
                    actions: sendParent('PONG', {
                        delay: 1000
                    })
                }
            }
        }
    }
});


const service = interpret(pingMachine).start();
