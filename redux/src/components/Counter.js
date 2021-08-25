import React from "react";
import action from '../store/actions/counter1';
import {connect} from 'react-redux';
class Counter extends React.Component{
  render(h) {
    return(
      <div>
        <button onClick={this.props.add}>+</button>
        <p>{this.props.number}</p>
        <button onClick={this.props.minus}>-</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.counter1
}

export default connect(
  mapStateToProps,
  action
)(Counter); // 柯里化