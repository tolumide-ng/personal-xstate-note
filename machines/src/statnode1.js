const fetchMachine = Machine({
    id: 'fetch',

    // Initial state
    initial: 'idle',

    // States
    states: {
        idle: {
            on: {
                FETCH: 'pending'
            }
        },
        pending: {
            on: {
                FULFILL: 'success',
                REJECT: 'failure'
            }
        },
        success: {
            // Initial child state
            initial: 'items',

            // Child states
            states: {
                items: {
                    on: {
                        'ITEM.CLICK': 'item'
                    }
                },
                item: {
                    on: {
                        BACK: 'items'
                    }
                }
            }
        },
        failure: {
            on: {
                RETRY: 'pening'
            }
        }
    }
})