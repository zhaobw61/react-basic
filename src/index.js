import React from './react';
import ReactDOM from './react-dom';
function Welcome(params) {
  return <p>Welcome1</p>
}

let ele = <p>
  <div>zhaobowen</div>
</p>;
console.log('ele', ele);

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 1}
  }

  handleClick=() => {
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
let asd = <Car/>;
console.log(asd);
ReactDOM.render(
  <Car/>,
  document.getElementById('root')
);
// console.log(JSON.stringify(obj, null, 2));
