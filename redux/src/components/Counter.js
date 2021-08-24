import {createStore} from 'redux';
import React from "react";
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
export default class Counter extends React.Component{
  state = {number: store.getState().number};
  componentDidMount() {
    store.subscribe(()=>{
      this.unSubscribe = this.setState({number: store.getState().number});
    })
  }
  componentWillUnmount() {
    this.unSubscribe && this.unSubscribe();
  }
  render(h) {
    return(
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => store.dispatch({type:ADD})}>+</button>
        <button onClick={() => store.dispatch({type:MINUS})}>-</button>
      </div>
    )
  }
}