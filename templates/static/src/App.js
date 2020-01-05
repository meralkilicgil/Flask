import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Login from './NavBarItems/Login/Login';
import Success from './NavBarItems/Success/Success';
import MakeSimilar from './NavBarItems/MakeSimilar/MakeSimilar';
import TopTracks from './NavBarItems/TopTracks/TopTracks';
import Discovery from './NavBarItems/Discovery/Discovery';
import DataInfo from './NavBarItems/DataScreen/DataScreen';
import FeelLucky from './NavBarItems/FeelLucky/FeelLucky';
import routes from "./routes";
import withTracker from "./withTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import UserActions from './NavBarItems/UserActions/UserActions';
import { Nav } from "shards-react";
import { Container, Navbar } from "shards-react";

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
              <div className="navbar-side">
                <ul className="nav-side">
                  <Link to="/" className="navlink"><li className="navitem-side"><h4 className="side-title">Login</h4></li></Link>
                  <Link to="/similar" className="navlink"><li className="navitem-side"><h4 className="side-title">Create Playlists</h4></li></Link>
                  <Link to="/discovery" className="navlink"><li className="navitem-side"><h4 className="side-title">Discovery</h4></li></Link>
                  <Link to="/feellucky" className="navlink"><li className="navitem-side"><h4 className="side-title">Feel Lucky</h4></li></Link>
                </ul>
              </div>
            </aside>
            <div className="header">
              <Container>
                <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
                  <Nav navbar className="border-left flex-row">
                    <UserActions />
                  </Nav>
                </Navbar>
              </Container>
            </div>
            <Switch>
              <Route exact path="/"><Login /> </Route>
              <Route path="/similar"><MakeSimilar /></Route>
              <Route path="/discovery"> <Discovery /></Route>
              <Route path="/data"><DataInfo /></Route>
              <Route path="/feellucky"><FeelLucky /></Route>
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
