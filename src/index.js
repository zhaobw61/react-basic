import React from 'react';
import ReactDOM from 'react-dom';

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
          <span>{this.state.number}</span>
        </span>
      </span>
    )
  }
}

// context--- start ---
let ThemeContext = React.createContext(null);
class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      color: 'red'
    }
  }
  changeColor = (color) => {
    this.setState({color})
  }
  render(h) {
    let contextVal = { color: this.state.color };
    return (
      <ThemeContext.Provider  value={contextVal}>
        <div id="a">
            <div id="b">
                <button onClick={
                  () => {
                    this.changeColor('yellow')
                  }
                }>change-yellow</button>
            </div>
            <div>
                <button onClick={
                  () => {
                    this.changeColor('red')
                  }
                }>change-red</button>
            </div>
            <span style={{color: this.state.color}}>Page - Page</span>
            <Title/>
        </div>
      </ThemeContext.Provider >
    )
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render(h) {
    return (
      <ThemeContext.Consumer>
        {
          (value) => {
            return (
              <div>
                <span style={{color: value.color}}>Title</span>
              </div>
            )
          }
        }
      </ThemeContext.Consumer>
    )
  }
}
// context--- end ---

// 反向继承--- start ---
let wrapper = oldComponent => {
  return class extends oldComponent {
    constructor(props) {
      super(props);
      this.state = {
        number: 1
      }
    }
    handleClick = () => {
      this.setState({number: this.state.number + 1})
    }
    render() {
      let oldComponentRenderElement = super.render();
      let newProps = {
        ...oldComponentRenderElement.props,
        onClick: this.handleClick
      }
      return React.cloneElement(oldComponentRenderElement, newProps, this.state.number);
    }
  }
}
@wrapper // 装饰器？？？？
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render(h) {
    return <button>dianji</button>
  }
}



// let NewButton = wrapper(Button);
// 反向继承--- end ---

// render props--- start ---
// 高阶组件
function withTracker(OldComponent) {
  return class MouseTracker extends React.Component{
    constructor(props) {
      super(props);
      this.state = {x:0, y:0}
    }
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
    render() {
      return(
        <div onMouseMove={this.handleMouseMove} style={{border: '1px solid #ccc'}}>
          <OldComponent {...this.state}/>
        </div>
      )
    }
  }
}
let HighOrder = withTracker((props) => (<>
  <div>移动鼠标</div>
  <p>当前鼠标的位置x={props.x}, y={props.y}</p>
  </>))
// render props--- end ---


ReactDOM.render(
  <HighOrder/>,
  document.getElementById('root')
);
// console.log(JSON.stringify(obj, null, 2));