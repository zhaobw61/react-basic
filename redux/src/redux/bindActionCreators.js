function bindActionCreator(actionCreator, dispatch) {
    return function name(...args) {
        dispatch(actionCreator(...args));
    }
}

function bindActionCreators(actionCreators, dispatch) {
    if(typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators,dispatch);
    }
    const boundActionCreators = {};
    for(const key in actionCreators){
        const actionCreator = actionCreators[key];
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
    return boundActionCreators;
}

export default bindActionCreators;