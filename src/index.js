import React from 'react';
import ReactDOM from 'react-dom';
// JSX React.createElement("h1", null, "asd");
let element = React.createElement("h1", null, "asd")
ReactDOM.render(
  element,
  document.getElementById('root')
);
let obj = React.createElement("h1", null, "hello")
console.log(JSON.stringify(obj, null, 2));
