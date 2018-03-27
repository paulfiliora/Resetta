import React, { Component } from "react";

import HomepageBody from "../components/Homepage/HomepageBody";
import HomepageBody2 from "../components/Homepage/HomepageBody2";
import HomepageFooter from "../components/Homepage/HomepageFooter";
import { ResponsiveContainer } from "../components/Homepage/HomepageHeading";

import axios from 'axios';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.updateResults = this.updateResults.bind(this);
    this.state = { results: [] };
  }

  updateResults(newData) {
    this.setState({ results: newData });
    this.state.results.map( data => {
        console.log(data)
    })
  }

  createFavorite = async (favorite, index) => {
    try {
        const newFavoriteResponse = await axios.post(`/favorites`, favorite)

        const updatedFavoritesList = [...this.state.favorites]
        updatedFavoritesList.push(newFavoriteResponse.data)
        this.setState({favorites: updatedFavoritesList})

    } catch(error) {
        console.log('Error creating new Favorite!')
        console.log(error)
    }
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
