import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Login from './NavBarItems/Login/Login';
import Success from './NavBarItems/Success/Success';
import MakeSimilar from './NavBarItems/MakeSimilar/MakeSimilar';
import TopTracks from './NavBarItems/TopTracks/TopTracks';
import Discovery from './NavBarItems/Discovery/Discovery';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <aside className="mainsidebar">
            <div className="navbar">
              <ul className="nav">
                <li className="navitem"><Link to="/" className="navlink">Login</Link></li>
                <li className="navitem"><Link to="/similar" className="navlink">Make Similar Playlist</Link></li>
                <li className="navitem"><Link to="/toptracks" className="navlink">Top Tracks</Link></li>
                <li className="navitem"><Link to="/discovery" className="navlink">Discovery</Link></li>
              </ul>
            </div>
            </aside>
            <Switch>
              <Route exact path="/"><Login /> </Route>
              <Route path="/similar"><MakeSimilar /></Route>
              <Route path="/toptracks"> <TopTracks /></Route>
              <Route path="/discovery"> <Discovery /></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
