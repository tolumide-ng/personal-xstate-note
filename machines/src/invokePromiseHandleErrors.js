import { assign } from "xstate/lib/actionTypes";

const search = (context, event) => new Promise((resolve, reject) => {
    if (!event.query.length) {
        return reject('No query specified');
    }
    return getSearchResilts(event.query);
});





const searchMachine = Machine({
    id: 'search',
    initial: 'idle',
    context: {
        results: undefined,
        errorMessage: undefined
    },
    states: {
        idle: {
            on: {
                SEARCH: 'searching'
            }
        },
        searching: {
            invoke: {
                id: 'search',
                src: search,
                onError: {
                    target: 'failure',
                    actions: assign({
                        errorMessage: (context, event) => {
                            return event.data;
                        }
                    })
                },
                onDone: {
                    target: 'success',
                    actions: assign({
                        target: 'success',
                        actions: assign({result: (_, event) => event.data})
                    })
                }
            }
        },
        success: {},
        failure: {}
    }
})



