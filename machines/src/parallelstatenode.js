import { Machine } from 'xstate';

const fileMachine = Machine({
    id: 'file',
    type: 'parallel',
    states: {
        upload: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        INIT_UPLOAD: 'pending'
                    }
                },
                pending: {
                    on: {
                        UPLOAD_COMPLETE: 'success'
                    }
                },
                success: {}
            }
        },
        download: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        INIT_DOWNLOAD: 'pending'
                    }
                },
                pending: {
                    on: {
                        DOWNLOAD_COMPLETE: 'success'
                    }
                },
                success: {}
            }
        }
    }
});


console.log(fileMachine.initialState.value);
// => {
// uplaod: 'idle',
// download: 'idle'
// }




console.log(fileMachine.transition({
    upload: 'pending',
    download: 'idle'
},
    'UPLOAD_COMPLETE').value);

// => {
// upload: 'success',
// download: 'idle'
// }



