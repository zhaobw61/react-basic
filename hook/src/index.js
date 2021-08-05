import React, {memo} from 'react';
import ReactDOM from 'react-dom';
let hookStates = [];
let hookIndex = 0;
function useState(initalState) {
    hookStates[hookIndex] = hookStates[hookIndex] || initalState;
    let currentIndex = hookIndex;
    function setState(newState) {
        hookStates[currentIndex] = newState;
        render();
    }
    return [hookStates[hookIndex++], setState];
}

function useMemo(factory, deps) {
    if(hookStates[hookIndex]) {
        let [lastMemo, lastDeps] = hookStates[hookIndex];
        let same = deps.every((item, index) => item === lastDeps[index]);
        if(same) {
            hookIndex++;
            return lastMemo;
        } else {
            let newMemo = factory();
            hookStates[hookIndex++] = [newMemo, deps];
            return newMemo;
        }
    } else {
        let newMemo = factory();
        hookStates[hookIndex++] = [newMemo, deps];
        return newMemo;
    }
}

function useCallback(callback, deps) {
    if(hookStates[hookIndex]) {
        let [lastCallBack, lastDeps] = hookStates[hookIndex];
        let same = deps.every((item, index) => item === lastDeps[index]);
        if(same) {
            hookIndex++;
            return lastCallBack;
        } else {
            hookStates[hookIndex++] = [callback, deps];
            return callback;
        }
    } else {
        hookStates[hookIndex++] = [callback, deps];
        return callback;
    }
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
    hookIndex = 0;
    ReactDOM.render(
        <Child/>,
        document.getElementById('root'));
}
render()

