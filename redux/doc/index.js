import createStore from './redux/createStore'
let counter = document.getElementById('counter');
let addBtn = document.getElementById('add');
let minusBtn = document.getElementById('minus');
const ADD = 'ADD';
const MINUS = 'MINUS';

function reducer(state={number: 0}, action) {
  switch (action.type) {
    case ADD:
      return {number:state.number + 1};
    case MINUS:
      return {number:state.number - 1};
    default:
      return state;
  }
}
let store = createStore(reducer);
addBtn.addEventListener('click',()=>{
  store.dispatch({type: ADD});
})
minusBtn.addEventListener('click',()=>{
  store.dispatch({type: MINUS});
})
store.subscribe(render);
function render() {
  counter.innerText = store.getState().number
}
render();
/**
 * 如果传入新的对象的，咋办？ 貌似只能通过action 来修改
 * reducer为什么是一个函数
 */

/**
 * 语法：
 * createStore
 * dispatch
 * subscribe
 * getState
 * 没有办法监听一个字段
 */




