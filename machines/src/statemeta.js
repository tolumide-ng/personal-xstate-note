const fetchMeta = Machine({
    id: 'fetch',
    initial: 'idle',
    states: {
        idle: {
            on: { FETCH: 'loading' }
        },
        loading: {
            after: {
                3000: 'failure.timeout'
            },
            on: {
                RESOLVE: 'success',
                REJECT: 'failure',
                TIMEOUT: 'failure.timeout' // manual timeout
            },
            meta: {
                message: 'Loading...'
            }
        },
        success: {
            meta: {
                message: 'The request succeeded!'
            }
        },
        failure: {
            initial: 'rejection',
            states: {
                rejection: {
                    meta: {
                        message: 'The request failed. '
                    }
                },
                timeout: {
                    // you could choose to call a retry in the case of a timed out request
                    meta: {
                        message: 'The request timed out.'
                    }
                }
            },
            meta: {
                alert: 'Uh oh!'
            }
        }
    }
})



// Aggregating metaData;

function mergeMeta(meta) {
    return Object.keys(meta).reduce((acc, key) =>
    {
        const value = meta[key];

        // Assuming each meta value is an object
        Object.assign(acc, value);
        return acc;
    }, {});
}

const failureTimeout = fetchMachine.transition('loading', 'TIMEOUT');
console.log(mergeMeta(failureTimeout.meta));