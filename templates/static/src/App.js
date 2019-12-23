import React from 'react';
import './App.css';
import Login from './Login/Login';
import Success from './Success/Success';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
class App extends React.Component{

  constructor(props){
      super(props);
  }

  render(){
    return(
    <div className="App">
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/success">Success</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
          <form action = "http://localhost:5000/create" method = "post">
          
            <p>Create playlist similar to: </p>
            <p>Artist:   <input type="text" name="artist"></input></p>
            <p>Song: <input type="text" name="track"></input></p>
            <p>Count: <input type="text" name="count"></input></p>
            <p>Name: <input type="text" name="plName"></input></p>
            <input type="submit" value="Create" />
          </form>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </div>
  </Router>
  </div>
  );   
 }
}
export default App;
