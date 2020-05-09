import { Machine, spawn } from 'xstate';
import { assign } from 'xstate/lib/actionTypes';
// import 'fakeMachine' from './fakeMachine'


const todoMachine = Machine({
    on: {
        'NEW_TODO.ADD': {
            actions: assign({
                todos: (context, event) => [
                    ...context.todos,
                    {
                        todo: event.todo,
                        // add a new todoMachine actor with a unique name
                        ref: spawn(fakeMachine, `todo-${event.id}`)
                    }
                ]
            })
        }
    }
})