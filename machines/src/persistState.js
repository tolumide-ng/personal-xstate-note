import { State, interpret } from 'xstate'
import { lighMachine } from './statedef'

// Retrieving the state definition from localStogae
const stateDefinition = JSON.parse(localStorage.getItem('app-state'));

// Use State.create() to restore state from a plain object
const previousState = State.create(stateDefinition);

// Use machine.resolveState() to resolve the state definition to a new State instance relative to the machine
const resolvedState = myMachine.resolveState(previousState);


const service = interpret(lighMachine).resolve(previousState);