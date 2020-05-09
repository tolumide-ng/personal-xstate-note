import { Machine } from 'xstate';

const settingsMachine = Machine({
    id: 'settings',
    initial: 'parallel',
    states: {
        mode: {
            initial: 'active',
            states: {
                inactive: {},
                pending: {},
                active: {}
            }
        },
        status: {
            initial: 'enabled',
            states: {
                disabled: {},
                enabled: {}
            }
        }
    },
    on: {
        // Multiple targets
        DEACTIVATE: {
            target: ['.mode.inactive', '.status.disabled']
        }
    }
})
