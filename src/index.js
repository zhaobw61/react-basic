import React from 'react';
import ReactDOM from 'react-dom';

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 1}
  }

  handleClick=(event) => {
    console.log('event', event);
    this.setState({num:this.state.num+1})
    this.setState({num:this.state.num+1})
  }

  render() {
    return (
      <div>
        <h1>Hellow</h1>
        <h2>{this.state.num}</h2>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

class Sum extends React.Component {
  add = () => {

  }
  render() {
    return (
      <div> </div>
    )
  }
}

ReactDOM.render(
  <Car/>,
  document.getElementById('root')
);
// console.log(JSON.stringify(obj, null, 2));
