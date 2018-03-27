import React, { Component } from "react";

import HomepageBody from "../components/Homepage/HomepageBody";
import HomepageBody2 from "../components/Homepage/HomepageBody2";
import HomepageFooter from "../components/Homepage/HomepageFooter";
import { ResponsiveContainer } from "../components/Homepage/HomepageHeading";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.updateResults = this.updateResults.bind(this);
    this.state = { results: [] };
  }

  updateResults(newData) {
    this.setState({ results: newData });
    // this.state.results.map( data => {
    //     console.log(data)
    // })
  }

  render() {
    const ResponsiveContainers = () => (
      <ResponsiveContainer
        results={this.state.results}
        updateResults={this.updateResults}
      />
    );
    return (
      <ResponsiveContainers>
        <HomepageBody />
        <HomepageBody2 />
        <HomepageFooter />
      </ResponsiveContainers>
    );
  }
}

export default Homepage;
