import { createDOM } from "./react-dom";
import {isFunction} from './utils'

export let updateQueue = {
    updaters:[],
    isBatchingUpdate:true,
    add(updater) {
        this.updaters.push(updater);
    },
    batchUpdate(){
        this.updaters.forEach(updater => updater.updateComponent());
        this.isBatchingUpdate = false;
    }
}
class Updater{
    constructor(classInstance){
        this.classInstance = classInstance;
        this.pendingStates = [];
    }

    addState(partialState){
        this.pendingStates.push(partialState);
        // updateQueue.isBatchingUpdate?updateQueue.add(this):this.updateComponent();
        this.emitUpdate(); // 发射更新
    }

    emitUpdate() {
        updateQueue.isBatchingUpdate?updateQueue.add(this):this.updateComponent();
    }

    updateComponent() {
        let {classInstance, pendingStates} = this;
        if(pendingStates.length > 0){
            shouldUpdate(classInstance,this.getState());
        }
    }

    getState(){
        let {classInstance,pendingStates} = this;
        let {state} = classInstance;
        if(pendingStates.length > 0) {
            pendingStates.forEach(nextState => {
                if(isFunction(nextState)){
                    nextState = nextState(state);
                }
                state = {...state, ...nextState};
            });
            pendingStates.length = 0;
        }
        return state;
    }
}

function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState;
    if(classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(classInstance.props, nextState)){
        return;
    }
    classInstance.forceUpdate();
}

class Component {
    static isReactComponent = true;
    constructor(props) {
        this.props = props;
        this.state = {};
        this.updater = new Updater(this);
    }

    setState(partialState) {
        // this.state = {...this.state, ...partialState};
        // let renderVdom = this.render();
        // updateClassComponent(this, renderVdom);
        this.updater.addState(partialState)
    }
    // 强制更新
    forceUpdate() {
        if(this.componentWillUpdate) {
            this.componentWillUpdate();
        }
        let renderVdom = this.render();
        updateClassComponent(this, renderVdom);
    }
}
function updateClassComponent(classInstance, renderVdom) {
    let oldDOM = classInstance.dom;
    let newDOM = createDOM(renderVdom);
    oldDOM.parentNode.replaceChild(newDOM,oldDOM);
    if(this.componentDidUpdate) {
        this.componentDidUpdate();
    }
    classInstance.dom = newDOM;
}
export default Component;