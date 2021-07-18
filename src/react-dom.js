function render(vdom, container) {
    const dom = createDOM(vdom);
    container.appendChild(dom);
}

function createDOM(vdom) {
    if(typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    }
    if(!vdom) {
        return '';
    }
    let {type, props} = vdom;
    let dom = document.createElement(type);
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
    return dom;
}

function reconcileChildren(childrenVdom, parentDOM) {
    childrenVdom.forEach(childVdom => render(childVdom, parentDOM));
}

function updateProps(dom, props) {
    for(let key in props){
        if(key === 'children') continue;
        if(key === 'style') {
            let styleObj = props[key];
            for(let key in styleObj){
                dom.style[key] = styleObj[key];
            }
        } else {
            dom[key] = props[key];
        }
    }
}

let ReactDOM = {
    render
}

export default ReactDOM