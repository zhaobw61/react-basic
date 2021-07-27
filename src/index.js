import React from './react';
import ReactDOM from './react-dom';

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 1}
  }

  componentWillMount() {
    console.log('componentWillMount');

  }

  handleClick = (event) => {
    this.setState({num:this.state.num+1});
  }

  render() {
    return (
      <div>
        <h1>{this.state.num}</h1>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
}

ReactDOM.render(
  <Car/>,
  document.getElementById('root')
);
// console.log(JSON.stringify(obj, null, 2));
