import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./container/Homepage";

import "./App.css";

class App extends Component {
  render() {
    const Home = () => <Homepage />;

    return (
      <Router>
        <Switch>
          <Route exact path="/" render={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
