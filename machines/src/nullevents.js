import { Machine } from 'xstate';

const isAdult = ({ age }) => age >= 18;
const isMinor = ({ age }) => age < 18;


const ageMachine = Machine({
    id: 'age',
    context: { age: undefined },
    initial: 'unknown',
    states: {
        unknown: {
            on: {
                // immediately take transition that satisfies conditional guard.
                // otherwise, no transition occues
                '': [
                    { target: 'adult', cond: isAdult },
                    { target: 'child', cond: isMinor }
                ]
            }
        },
        ault: { type: 'final' },
        child: { type: 'final' }
    }
});


console.log(ageMachine.initialState.value);

const personData = { age: 28 };

const personMachine = ageMachine.withContext(personData);

console.log(personMachine.initialState.value)