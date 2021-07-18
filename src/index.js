import React from './react';
import ReactDOM from './react-dom';
// JSX React.createElement("h1", null, "asd");
let element = <h1 class='boowen'>bowen</h1>
function Welcome(params) {
  return <p>Welcome1</p>
}

let ele = <Welcome name="bowen"/>;
console.log('element', element);
console.log('ele', ele);
ReactDOM.render(
  ele,
  document.getElementById('root')
);
let obj = React.createElement("h1", null, "hello")
console.log(JSON.stringify(obj, null, 2));
