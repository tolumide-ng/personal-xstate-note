import { Machine } from 'xstate';


const searchMachine = Machine({
    // ...
    states: {
        idle: {
            on: {
                SEARCH: {
                    target: 'searching',
                    // Custom guard object
                    cond: {
                        type: 'searchValid',
                        minQueryLength: 3
                    }
                }
            }
        }
    }
}, {
    guards: {
        searchValid: (context, event, { cond }) =>
        {
            // cond === {type: 'searchValid', minQueryLength: 3}
            return (
                context.canSearch && event.query && event.query.length > cond.minQueryLength
            )
        }
    }
});

