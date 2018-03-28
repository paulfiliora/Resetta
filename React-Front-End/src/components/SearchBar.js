import React, { Component } from 'react'
import { Icon, Input, Form } from 'semantic-ui-react'
import axios from 'axios'

export class SearchBar extends Component{

  state = {
    base_url:'https://api.edamam.com/search?q=',
    query: '',
    app_id:'&app_id=ef03f549',
    api_key:'&app_key=a9fe5f06c5a1c078ffc893b930a74fea',
    calories: 'calories=591-722',
    health:'health=alcohol-free',
    results: []
}


handleChange = (event) => {
  const queryValue = event.target.value;
  this.setState({ query: queryValue })
};

handleSubmit = (event) => {
  event.preventDefault()  
  this.queryURL()
};

async queryURL () {
  try{
    const response = await axios.get(
      this.state.base_url
      +this.state.query
      +this.state.app_id
      +this.state.api_key
    )
    this.props.updateResults(response.data.hits)
    // this.setState({ results: response.data.hits })
    // console.log(this.state.results)
  }
  catch(error) {
    console.log('Error retrieving query!')
    console.log(error);
  }
};

  render(){
    // console.log(this)
    
    return(
      <Form onSubmit={this.handleSubmit}>
      <Input
        icon={<Icon name='search' inverted circular link />}
        placeholder='Find a recipe...'
        onChange={this.handleChange}
      />
      </Form>
    )
  }
}

// expo SearchBar