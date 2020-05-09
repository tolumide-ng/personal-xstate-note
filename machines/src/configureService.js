const fetchUser = () => {}

// using string src on invoke (configureService)

const userMachine = Machine({
    id: 'user',
    states: {
        loading: {
            invoke: {
                id: 'get-user',
                src: 'getUser'
            }
        }
    }
}, {
    service: {
        getUser: (context, event) => fetchUser(context.user.id)
    }
});

