import { createDOM } from "./react-dom";

class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(partialState) {
        this.state = {...this.state, ...partialState};
        let renderVdom = this.render();
        updateClassInstance(this, renderVdom);
    }
}
function updateClassInstance(classInstance, renderVdom) {
    let oldDOM = classInstance.dom;
    let newDOM = createDOM(renderVdom);
    oldDOM.parentNode.replaceChild(newDOM,oldDOM);
    classInstance.dom = newDOM;
}
export default Component;