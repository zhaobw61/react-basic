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
    console.log('this.state.num', this.state);
  }

  render() {
    return (
      <div>
        <h1>
          <span>Car:</span>
          <span>{this.state.num}</span>
        </h1>
        <h1>
          <span>ChildCar:</span>
          <ChildCar count={this.state.num}/>
        </h1>
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

class ChildCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
  }
  // 类的静态方法， 从属性对象映射状态对象
  // nextProps:下次传入的属性
  // prevState：即将改变的属性
  static getDerivedStateFromProps(nextProps, prevState) {
    let {count} = nextProps;
    console.log('count', count);
    return {
      number:count * 2
    }
  }
  render() {
    return (
      <span>
        <span>
          <span>asdasd</span>
          <span>{this.state.number}</span>
        </span>
      </span>
    )
  }
}

ReactDOM.render(
  <Car/>,
  document.getElementById('root')
);
// console.log(JSON.stringify(obj, null, 2));
