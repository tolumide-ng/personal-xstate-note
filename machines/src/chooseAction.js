import { actions } from 'xstate';
const { choose, log } = actions;


const maybeDoThese = Choose([
    {
        cond: 'cond1',
        actions: []
    }
])