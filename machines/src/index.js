import {
    Machine, State, actions,
    assign, send, sendParent, interpret, spawn
} from 'xstate'