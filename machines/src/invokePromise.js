// function that returns a promise. this promise might resolve with e.g., {name: 
// 'David', location: 'Florida'}



const fetchUser = userId => fetch(`url/to/user/${userId}`).then(response => response.json());


const userMachine = Machine({
    id: 'user',
    initial: 'idle',
    context: {
        userId: 42,
        user: undefined,
        error: undefined
    },
    states: {
        idle: {
            on: {
                FETCH: 'loading'
            }
        },
        loading: {
            invoke: {
                id: 'getUser',
                src: (context, event) => fetchUser(context.userId),
                onDone: {
                    target: 'success',
                    actions: assign({ user: (context, event) => event.data })
                },
                onError: {
                    target: 'failure',
                    actions: assign({ error: (context, event) => event.data })
                }
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: 'loading'
            }
        }
    }
});


