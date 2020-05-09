import { Machine, interpret } from 'xstate';

const lightMachine = Machine({
    // 
});

const { initialState } = lighMachine;


let nextState = lightMachine.transition(initialState, 'TIMER');


nextState = lightMachine.transition(nextState, { type: 'TIMER' });




// ======>>>>>>>>>>>>
const mouseMachine = Machine({
    // 
});

const mouseMachine = interpret(mouseMachine).start();

window.addEventListener('mousemove', event => {
    // event can be sent directly to service
    mouseService.send(event);;
})