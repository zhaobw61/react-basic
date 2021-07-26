import { addEvent } from './event.js'
function render(vdom, container) {
    console.log('vdom', vdom);
    const dom = createDOM(vdom);
    container.appendChild(dom);
}
// 把虚拟dom 变为真实的dom
export function createDOM(vdom) {
    if(typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    }
    if(!vdom) {
        return '';
    }
    let {type, props, ref} = vdom;
    let dom;
    // 函数组件
    if(typeof type === 'function'){
        // 类组件
        if(type.isReactComponent) {
            return updateClassComponent(vdom);
        } else {
            return updateFunctionComponent(vdom);
        }
    } else {
        dom = document.createElement(type);
    }
    updateProps(dom, props);
    // 添加子节点
    if(typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children;
    } else if(typeof props.children === 'Object' && props.children.type) { // 一个子节点 ERROR:多个子节点是数组，但是typeof也会被判断为Object
        render(props.children, dom);
    } else if (Array.isArray(props.children)){ // 多个子节点
        reconcileChildren(props.children, dom);
    } else {
        dom.textContent = props.children ? props.children.toString() : '';
    }
    if(ref){
        ref.current = dom;
    }
    return dom;
}
// 渲染类组件
function updateClassComponent(vdom) {
    let {type, props} = vdom;
    let classInstance = new type(props);

    vdom.classInstance = classInstance;

    if(classInstance.componentWillMount) {
        classInstance.componentWillMount()
    }
    let renderVdom = classInstance.render();
    const dom = createDOM(renderVdom);
    vdom.dom = renderVdom.dom = dom;

    classInstance.oldVdom = renderVdom;// render里的虚拟dom
    classInstance.dom = dom; // 通过虚拟dom生成DOM
    if(classInstance.componentDidMount) {
        classInstance.componentDidMount()
    }
    return dom;
}
// 渲染函数组件
function updateFunctionComponent(vdom) {
    let { type,props } = vdom;
    let renderVdom = type(props);
    return createDOM(renderVdom);
}

function reconcileChildren(childrenVdom, parentDOM) {
    childrenVdom.forEach(childVdom => render(childVdom, parentDOM));
}

function updateProps(dom, oldProps, newProps) {
    for(let key in newProps){
        if(key === 'children') continue;
        if(key === 'style') {
            let styleObj = newProps[key];
            for(let key in styleObj){
                dom.style[key] = styleObj[key];
            }
        }else if(key.startsWith('on')) {
            // dom[key.toLocaleLowerCase()] = newProps[key];
            addEvent(dom, key.toLowerCase(), newProps[key]);
        } else {
            dom[key] = newProps[key];
        }
    }
}
// DOM-DIFF的比较更新
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
    console.log('compareTwoVdom---compareTwoVdom');
    if(oldVdom === null && newVdom === null){
        return null;
    } else if(oldVdom && newVdom === null) {
        let currentDOM = oldVdom.dom;
        parentDOM.removeChild(currentDOM);
        if(oldVdom.classInstance && oldVdom.classInstance.componentWillMount){
            oldVdom.classInstance.componentWillMount();
        }
        return null;
    } else if(oldVdom === null && newVdom) {
        let newDOM = createDOM(newVdom);
        newDOM.dom = newDOM;
        parentDOM.appendChild(newDOM);
        return newVdom;
    } else {
        updateElement(oldVdom, newVdom);
        return newVdom;
    }
}

function updateElement(oldVdom, newVdom) {
    let currentDOM = newVdom.dom = oldVdom.dom;
    newVdom.classInstance = oldVdom.classInstance;
    if(typeof oldVdom.type === 'string'){
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if(typeof oldVdom.type === 'function') { // 就是类组件
        updateClassInstance(oldVdom, newVdom);
    }
}

function updateChildren(parentDOM,oldVChildren,newVChildren) {
    
}

function updateClassInstance(oldVdom, newVdom) {
    
}

let ReactDOM = {
    render
}

export default ReactDOM