import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./container/Homepage";
import Favorites from "./container/Favorites";

import "./App.css";

class App extends Component {
  render() {
    const Home = () => <Homepage />;
    const Favs = () => <Favorites />;


    return (
      <Router>
        <Switch>
          <Route exact path="/" render={Home} />
          <Route exact path="/favorites" render={Favs} />
        </Switch>
      </Router>
    );
  }
}

export default App;
