import React from 'react';
import ReactDOM from 'react-dom';
function Welcome(params) {
  return <p>Welcome1</p>
}

let ele = <Welcome name="bowen"/>;

class Car extends React.Component {
  render() {
    return <div>asdasd</div>
  }
}
let asd = <Car/>;
console.log('type',  typeof asd.type);
ReactDOM.render(
  ele,
  document.getElementById('root')
);
let obj = React.createElement("h1", null, "hello")
// console.log(JSON.stringify(obj, null, 2));
