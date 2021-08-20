import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <>
        <Route path="/" component={Home}/>
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
      </>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);