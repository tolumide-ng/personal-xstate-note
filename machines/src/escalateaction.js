import { createMachine, actions } from 'xstate';
import { escalate } from 'xstate/lib/actions';
const { esclate } = actions;

const childMachine = createMachine({
    //  this will be sent to the parent machine that invokes this child
    entry: escalate({ message: 'This is some error' })
});


const parentMachine = createMachine({
    invoke: {
        src: childMachine,
        onError: {
            actions: (context, event) =>
            {
                console.log(event.data)
            }
        }
    }
});
