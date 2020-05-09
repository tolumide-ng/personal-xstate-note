import { Machine } from 'xstate';

const searchValid = (context, event) => {
    return context.canSearch && event.query && event.query.length > 0;
};


const searchMachine = Machine({
    id: 'search',
    initial: 'idle',
    context: {
        onSearch: true
    },
    states: {
        idle: {
            on: {
                SEARCH: [
                    // or {type: 'searchValid'}
                    { target: 'searching', cond: searchValid },
                    {target: '.invalid'}
                ]
            },
            initial: 'normal',
            states: {
                normal: {},
                invalid: {}
            }
        },
        searching: {
            entry: 'executeSearch'
            // ...
        },
        searchError: {
            // ...
        }
    }
}, {
    guards: {
        searchValid // optinoal, if the implementation doesn't change
    }
})