function  createHashHistory(params) {
    let gloabHistory = window.history;
    let listeners = [];
    function go(n) {
        gloabHistory.go(n);
    }
    function goBack() {
        go(-1);
    }
    function goForward() {
        go(1);
    }
    function listen(listener) {
        listeners.push(listener);
    }
    function setState(newState) {
        Object.assign(history, newState);
        history.length = globalHistory.length;
        listeners.forEach(listener => listener(newState.location));
    }
    function push(path, state) {
        const action = 'PUSH';
        globalHistory.pushState(state, null,pathname);
        let location = {state, pathname};
        setState({action, location});
    }
    function replace(params) {
    }
    const history = {
        action: "POP",
        go,
        goBack,
        goForward,
        length: gloabHistory.length,
        listen,
        location: {pathname: window.location.hash?window.location.hash.slice(1):'/', state: gloabHistory.state},
        push,
        replace
    }
    return history;
}

export default createBrowserHistory;