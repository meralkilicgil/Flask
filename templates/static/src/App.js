import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Login from './NavBarItems/Login/Login';
import Success from './NavBarItems/Success/Success';
import MakeSimilar from './NavBarItems/MakeSimilar/MakeSimilar';
import TopTracks from './NavBarItems/TopTracks/TopTracks';
import Discovery from './NavBarItems/Discovery/Discovery';
import DataInfo from './NavBarItems/DataScreen/DataScreen';
import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
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
                  <li className="navitem"><Link to="/similar" className="navlink">Create Playlists</Link></li>
                  <li className="navitem"><Link to="/discovery" className="navlink">Discovery</Link></li>
                </ul>
              </div>
            </aside>
            <Switch>
              <Route exact path="/"><Login /> </Route>
              <Route path="/similar"><MakeSimilar /></Route>
              <Route path="/discovery"> <Discovery /></Route>
              <Route path="/data"><DataInfo /></Route>
            </Switch>
          </div>
        </Router>
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
        </Router>
      </div>
    );
  }
}
export default App;
