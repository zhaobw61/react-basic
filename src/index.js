import React from './react';
import ReactDOM from './react-dom';

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num: 1}
  }

  componentWillMount() {

  }

  handleClick = (event) => {
    console.log('event', event);
    this.setState({num:this.state.num+1})
    this.setState({num:this.state.num+1})
  }

  render() {
    return (
      <div>
        <h1>Hellow</h1>
        <div>world</div>
      </div>
    )
  }
  componentDidMount() {}

  shouldComponentUpdate(){}

  componentWillUpdate() {}

  componentDidUpdate() {}
}

ReactDOM.render(
  <Car/>,
  document.getElementById('root')
);
// console.log(JSON.stringify(obj, null, 2));
