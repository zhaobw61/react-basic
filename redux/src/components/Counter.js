import React from "react";
import  store from '../store'
import {bindActionCreators} from 'redux';
import action from '../store/actions/counter1';
let boundActions = bindActionCreators(action, store.dispatch);
export default class Counter extends React.Component{
  state = {number: store.getState().counter1.number};
  componentDidMount() {
    store.subscribe(()=>{
      this.unSubscribe = this.setState({number: store.getState().counter1.number});
    })
  }
  componentWillUnmount() {
    this.unSubscribe && this.unSubscribe();
  }
  render(h) {
    return(
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => boundActions.add()}>+</button>
        <button onClick={boundActions.minus()}>-</button>
      </div>
    )
  }
}