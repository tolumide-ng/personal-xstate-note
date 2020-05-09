import { Machine, interpret } from 'xstate';

const secretMachine = Machine({
    id: 'secret',
    initial: 'wait',
    context: {
        secret: '42'
    },
    states: {
        wait: {
            after: {
                1000: 'reveal'
            }
        },
        reveal: {
            type: 'final',
            data: {
                secret: (context, event) => context.secret
            }
        }
    }
});


const parentMachine = Machine({
    id: 'parent',
    initial: 'pending',
    context: {
        reveraledSecret: undefined
    },
    states: {
        pending: {
            invoke: {
                id: 'secret',
                src: secretMachine,
                onDone: {
                    target: 'success',
                    actions: assign({
                        revealedSecret: (context, event) => {
                            // event is:
                            // { type: 'done.invoke.secret'; data: {secret: '32'}}
                            return event.data.secret;
                        }
                    })
                }
            }
        },
        success: {
            type: 'final'
        }
    }
});



const service = interpret(parentMachine).onTransition(state =>
    console.log(state.context)).start();

// => { revealedSecret: undefined }
// ...
// => { revealed: '42' }