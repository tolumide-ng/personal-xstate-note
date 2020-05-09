import { Machine, forwardTo, interpret } from 'xstate';

function alertService(_, receive) {
    receive((event) =>
    {
        if (event.type === 'ALERT') {
            alert(event.message)
        }
    });
}


const parentMachine = Machine({
    id: 'parent',
    invoke: {
        id: 'alerter',
        src: () => alertService
    },
    on: {
        ALERT: { action: forwardTo('alerter') }
    }
});


const parentService = interpret(parentMachine).start();

parentService.send('ALERT', { message: 'hello world' });

