import { createStore } from 'redux';

let initState = {
    status: false
}


let myReducer = (state = initState, action) => {

    switch (action.type) {
        case 'ToggleMenu':
            return {
                ...state,
                state: !state.status
            }
        default:
            break;
    }
    return state;
}

const store = createStore(myReducer);

console.log(store.getState());
