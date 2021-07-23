import Component from './Component'
function createElement(type, config, children) {
    if(config) {
        delete config._owner;
        delete config._store;
        ref = config.ref;
        delete config.ref;
    }
    let props = { ...config };
    if(arguments.length > 3) {
        children = Array.prototype.slice.call(children, 2);
    }
    props.children = children;
    return {
        type, props, ref
    }
}

function createRef() {
    return { current: null };
}

let React = {
    createElement,
    Component
}

export default React;