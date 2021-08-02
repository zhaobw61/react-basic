import Component from './Component';
// import {updateQueue} from './Component';
// console.log('updateQueue', updateQueue);
export let reactFragment = 'react.fragment';
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

function cloneElement(element, props, children) { // 这里传入的时候vdom的格式， 有个奇怪的地方，如果是这样的话，那不就覆盖了要克隆的元素的子元素嘛？
    if(arguments.length > 3) {
        children = Array.prototype.slice.call(arguments, 2);
    }
    props.children = children;
    return {
        ...element,
        props
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

class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        let oldKeyLength = Object.keys(this.state).length;
        let newKeyLength = Object.keys(nextState).length;
        if(oldKeyLength != newKeyLength){
            return true;
        }
        for(let key in this.state) {
            console.log('state',this.state[key], key);
            console.log('nextState', nextState[key], key);
            if(this.state[key] !== nextState[key]){
                return true;
            }
        }
        return false;
    }
}

let React = {
    createContext,
    createElement,
    Component,
    cloneElement,
    PureComponent
}

export default React;