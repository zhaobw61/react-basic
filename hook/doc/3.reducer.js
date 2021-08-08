import React, {memo} from 'react';
import ReactDOM from 'react-dom';
let hookStates = [];
let hookIndex = 0;

function reducer(state, action) {
    switch (action) {
        case 'ADD':
            return {number: state.number + 1};
        default:
            return state;
    }
}

let initialState = 1;

function init(initialState) {
    return {number: initialState}
}

function Child() {
    let [state, dispatch] = React.useReducer(reducer, initialState, init);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>dispatch("ADD")}>+++</button>
        </div>
    )
}
function render() {
    hookIndex = 0;
    ReactDOM.render(
        <Child/>,
        document.getElementById('root'));
}
render()

