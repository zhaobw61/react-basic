function createElement(type, config, children) {
    if(config) {
        delete config._owner;
        delete config._store;
    }
    let props = { ...config };
    if(arguments.length > 3) {
        children = Array.prototype.slice.call(children, 2);
    }
    props.children = children;
    return {
        type, props
    }
}

let React = {
    createElement
}

export default React;