// import PropTypes from 'prop-types'
import React, {Component} from 'react'

import HomepageBody from '../components/Homepage/HomepageBody'
import HomepageBody2 from '../components/Homepage/HomepageBody2'
import HomepageFooter from '../components/Homepage/HomepageFooter'
import {ResponsiveContainer} from '../components/Homepage/HomepageHeading'


class Homepage extends Component {

  constructor(props) {
    super(props);
    this.updateResults = this.updateResults.bind(this)
    this.state = { results: [] }
}

updateResults(newData){
    console.log(newData)
    this.setState({results : newData})
    console.log("state results: "+this.state.results);
    this.state.results.map( data => {
        console.log(data)
    })
}

  render() { 
    

    const _ResponsiveContainer = () => (
      <ResponsiveContainer
      results={this.state.results}
      updateResults={this.updateResults}
      />
  )

    return ( 
      <_ResponsiveContainer >
        <HomepageBody/>
        <HomepageBody2/>
        <HomepageFooter/>
      </_ResponsiveContainer> 
     )
  }
}
 
export default Homepage