import { addEvent } from './event.js'
function render(vdom, container, mountIndex) {
    const dom = createDOM(vdom, mountIndex);
    if(dom) {
        container.appendChild(dom);
    }
}
// 把虚拟dom 变为真实的dom
export function createDOM(vdom, mountIndex) {
    if(typeof vdom === 'string' || typeof vdom === 'number') {
        let dom = document.createTextNode(vdom);
        dom._mountIndex = mountIndex;
        return dom;
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
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else {
        if(type === 'react.fragment') {
            dom = document.createDocumentFragment();
        } else {
            dom = document.createElement(type);
        }
    }
    updateProps(dom, {}, props);
    // 添加子节点
    if(typeof props.children === 'string' || typeof props.children === 'number') {
        dom.textContent = props.children;
    } else if(typeof props.children === 'object' && props.children.type) { // 一个子节点 ERROR:多个子节点是数组，但是typeof也会被判断为Object
        render(props.children, dom);
    } else if (Array.isArray(props.children)){ // 多个子节点
        reconcileChildren(props.children, dom);
    } else {
        dom.textContent = props.children ? props.children.toString() : '';
    }
    if(ref){
        ref.current = dom;
    }
    // 保存由改虚拟dom创建的真实的dom
    dom._mountIndex = mountIndex;
    vdom.dom = dom;
    return dom;
}
// 渲染类组件
function mountClassComponent(vdom) {
    let {type, props} = vdom;
    let classInstance = new type(props);

    vdom.classInstance = classInstance;
    classInstance.ownVdom = vdom;

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
function mountFunctionComponent(vdom) {
    let { type,props } = vdom;
    let renderVdom = type(props);
    vdom.renderVdom = renderVdom;
    return createDOM(renderVdom);
}
// 把虚拟DOM转换成真实DOM并且出入到父节点
function reconcileChildren(childrenVdom, parentDOM) {
    childrenVdom.forEach((childVdom, index) => {
        render(childVdom, parentDOM, index);
    });
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
function findDOM(vdom) {
    let {type} = vdom;
    let dom;
    if(typeof type === 'function') {
        if(type.isReactComponent){
            dom = findDOM(vdom.classInstance.oldRenderVdom);
        } else {
            dom = findDOM(vdom.oldRenderVdom);
        }
    } else {
        dom = vdom.dom;
    }
    return dom;
}
// DOM-DIFF的比较更新
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    if(!oldVdom && !newVdom){
        return null;
    } else if(oldVdom && !newVdom) {
        let currentDOM = oldVdom.dom;
        parentDOM.removeChild(currentDOM);
        if(oldVdom.classInstance && oldVdom.classInstance.componentWillMount){
            oldVdom.classInstance.componentWillMount();
        }
        return null;
    } else if(oldVdom === null && newVdom) {
        let newDOM = createDOM(newVdom);
        newDOM.dom = newDOM;
        if(nextDOM) {
            parentDOM.insertBefore(newDOM, nextDOM);
        } else {
            parentDOM.appendChild(newDOM);
        }
        return newVdom;
    } else if(oldVdom && newVdom && (oldVdom.type !== newVdom.type)) {
        let oldDOM = oldVdom.dom;
        let newDOM = createDOM(newVdom);
        oldDOM.parentNode.replaceChild(newDOM, oldDOM);
        if(oldVdom.classInstance && oldVdom.classInstance.componentWillMount){
            oldVdom.classInstance.componentWillMount();
        }
        // return newDOM;
        return newVdom;
    } else {
        updateElement(oldVdom, newVdom);
        return newVdom;
    }
}

function updateElement(oldVdom, newVdom) {// ???????????????????????????????????
    if(typeof oldVdom.type === 'string'){ // dom节点组件
        let currentDOM = newVdom.dom = oldVdom.dom;
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
    } else if(typeof oldVdom.type === 'function') {
        if(oldVdom.type.isReactComponent){ // 就是类组件
            newVdom.dom = oldVdom.dom;
            newVdom.classInstance = oldVdom.classInstance;
            updateClassInstance(oldVdom, newVdom);
        } else { // 是一个函数式组件
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}

function updateFunctionComponent(oldVdom, newVdom) {// ???????????????????????????????????
    let parentDOM = oldVdom.renderVdom.dom.parentNode;
    let { type,props } = newVdom;
    let newRenderVdom = type(props);
    compareTwoVdom(parentDOM, oldVdom.renderVdom, newRenderVdom);
}

function updateChildren(parentDOM,oldVChildren,newVChildren) {
    if((typeof oldVChildren === 'string' || typeof oldVChildren === 'number')
    && (typeof newVChildren === 'string' || typeof newVChildren === 'number')){
        if(oldVChildren != newVChildren) {
            parentDOM.textContent = newVChildren;
        }
        return;
    }
    oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
    newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
    let maxLength = Math.max(oldVChildren.length, newVChildren.length);

    function findDOMByIndex(index) {
        for(let i=0; i<parentDOM.childNodes.length; i++){
            if(parentDOM.childNodes[i]._mountIndex === index){
                return parentDOM.childNodes[i];
            }
        }
    }

    // TODOM DOM-DIFF的优化
    for(let i=0; i<maxLength; i++) {
        // 找此虚拟DOM对应的真实DOM之后的存在的真是DOM
        let nextDOM = oldVChildren.find((item, index) => index > i && item && item.dom);
        if((typeof oldVChildren[i] === 'string' || typeof oldVChildren[i] === 'number')
        && (typeof newVChildren[i] === 'string' || typeof newVChildren[i] === 'number')){
            if(oldVChildren != newVChildren) {
                let dom = findDOMByIndex(i);
                if(dom){
                    dom.textContent = newVChildren[i];
                }
            }
            continue;
        }
        compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextDOM?.dom);
    }
}

function updateClassInstance(oldVdom, newVdom) {// ???????????????????????????????????
    let classInstance = oldVdom.classInstance;
    if(classInstance.componentWillReceiveProps){
        classInstance.componentWillReceiveProps();
    }
    // 把新的属性传递给emitupdate方法
    classInstance.updater.emitUpdate(newVdom.props);
}

let ReactDOM = {
    render
}

export default ReactDOM