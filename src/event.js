import { updateQueue } from "./Component";

export function addEvent(dom , eventType, listener) {
    let store = dom.store || (dom.store={});
    store[eventType] = listener;
    if(!document[eventType]){ // 这样写，可能会被用户覆盖掉
        document[eventType] = dispatchEvent;
    }
}
let syntheticEvent = {};
function dispatchEvent(event) {
    let {target, type} = event;
    let eventType = `on${type}`
    updateQueue.isBatchingUpdate = true;
    syntheticEvent = createSyntheticEvent(event);
    while(target) {
        let { store } = target;
        let listener = store && store[eventType];
        listener && listener.call(target, syntheticEvent);
        target = target.parentNode;
    }
    for(let key in syntheticEvent) {
        syntheticEvent[key] = null;
    }
    updateQueue.batchUpdate();
}

function createSyntheticEvent(nativeEvent) {
    for(let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key];
    }
    return syntheticEvent;
}