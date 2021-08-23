function createStore(reducer) {
    let state, listeners=[];
    function getState(params) {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => {
            listener();
        })
    }
    function subscribe(listener) {
        listeners.push(listener);
    }
    // 派发一个默认动作，为了获得初始值
    dispatch({type:"@REDUX/INIT"});
    return {
        getState,
        dispatch,
        subscribe
    }
}
export default createStore;