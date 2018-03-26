import React, {Component} from 'react'
// import axios from 'axios'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Homepage from './container/Homepage'
import Resultspage from "./container/Resultspage";

import './App.css'; 

class App extends Component {

        // constructor(props) {
        //     super(props);
        //     this.updateResults = this.updateResults.bind(this)
        //     this.state = { results: [] }
        // }

        // updateResults(newData){
        //     console.log(newData)
        //     this.setState({results : newData})
        //     console.log("state results: "+this.state.results);
        //     this.state.results.map( data => {
        //         console.log(data)
        //     })
        // }

    render() {

        const Home = () => (
            <Homepage
            // results={this.state.results}
            // updateResults={this.updateResults}
            />
        )


        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={Home} />
                    {/* <Route exact path="/results" render={Resultspage}/> */}
                </Switch>
            </Router>
        )
    }
}

export default App;
