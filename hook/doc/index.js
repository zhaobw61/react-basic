import React from 'react';
import ReactDOM from 'react-dom';
// 2020 10 25
let lastState;
function useState(initialState) {
    console.log(typeof initialState);
    console.log(initialState);
    // debugger;
    lastState = lastState || (typeof initialState === 'function' ? initialState() : initialState);
    function setState(newState) {
        if(typeof newState === 'function') {
            lastState = newState(lastState);
        }
        lastState = newState;
        render();
    }
    return [
        lastState,
        setState,
    ]
}
let lastRef
function useRef() { // 感觉就是创建了一个对象
    lastRef = lastRef || {current: null};
    return lastRef;
}
function Child() {
    const [number, setNumber] = useState(0);
    function alertNumber() {
        setTimeout(() => {
            alert(number);
        }, 3000);
    }
    return (
        <div>
            <p>{number}</p>
            <button onClick={() => setNumber(number + 1 )}>+++</button>
            <button onClick={alertNumber}>alertNumber</button>
        </div>
    )
}
function render() {
    ReactDOM.render(
        <Child/>,
        document.getElementById('root'));
}
render()