import Component from './Component'
function createElement(type, config, children) {
    let ref;
    if(config) {
        delete config._owner;
        delete config._store;
        ref = config.ref;
        delete config.ref;
    }
    let props = { ...config };
    if(arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2);
    }
    props.children = children;
    return {
        type, props, ref
    }
}

function createRef() {
    return { current: null };
}

function createContext(params) {
    let currentValue;
    function Provider(props) {
        currentValue = props.value
        return props.children;
    }
    function Consumer(props) {
        return props.children(currentValue);
    }
    return {
        Provider,
        Consumer,
    }
}

let React = {
    createContext,
    createElement,
    Component
}

export default React;