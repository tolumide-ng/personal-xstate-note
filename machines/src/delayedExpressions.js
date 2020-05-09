import { Machine } from 'xstate'
import { send } from 'xstate/lib/actionTypes'

const dynamicMachine = Machine({
    id: 'dynamicDelay',
    context: {
        initialDelay: 1000
    },
    initial: 'idle',
    states: {
        idle: {
            on: {
                ACTIVATE: 'pending'
            }
        },
        pending: {
            entry: send('FINISH', {
                // delay determined from custom event.wait property
                delay: (context, event) => context.initialDelay + event.wait || 0
            }),
            on: {
                FINISH: 'finished'
            }
        },
        finished: { type: 'final' }
    }
});


const dynamicDelayService = interpret(dynamicMachine).onDone(() => console.log('done!')).start();


dynamicDelayService.send({
    type: 'ACTIVATE',
    wait: 2000
})