const lightMachine = Machine({
    id: 'light',
    initial: 'green',
    states: {
        green: {},
        // ...
    }
})


console.log(lightMachine.initialState);
