import { Machine } from 'xstate';


const machine = Machine({
    id: 'fetch',
    initial: 'idle',
    states: {
        idle: {
            type: 'atomic',
            on: {
                'FETCH': 'pending'
            }
        },
        pending: {
            type: 'parallel',
            states: {
                resource1: {
                    type: 'compound',
                    initial: 'pending',
                    states: {
                        pending: {
                            on: {
                                'FULLFILL.resource1': 'success'
                            }
                        },
                        success: {
                            type: 'final'
                        }
                    }
                },
                resource2: {
                    type: 'compound',
                    initial: 'pending',
                    states: {
                        pending: {
                            on: {
                                'FULLFILL.resource2': 'success'
                            }
                        },
                        success: {
                            type: 'final'
                        }
                    }
                },
            },
            onDone: 'sucess'
        },
        success: {
            type: 'compound',
            initial: 'items',
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
                },
                hist: {
                    type: 'history',
                    history: 'shallow'
                }
            }
        }
    }
})