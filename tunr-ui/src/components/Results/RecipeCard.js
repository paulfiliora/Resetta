import React, { Component } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import axios from 'axios';

export class RecipeCard extends Component {

  state = {
    newFavorite: {}
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

  handleClick = () => {
    const newFavorite = [
      {label:this.props.recipe.label},
      {image_url:this.props.recipe.image},
      {api_uri:this.props.recipe.uri}
    ]
    console.log(newFavorite)
    this.setState({ active: !this.state.active })
  }

  // handleClick. pass along object from event.target. store in state. then POST
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createFavorite(this.state.newFavorite)
};

  render() {

    const { active } = this.state
    const recipe = this.props.recipe;

    return (
      <Card>
        <Image src={recipe.image} />
        <Card.Content>
          <Card.Header>{recipe.label}</Card.Header>
          <Card.Meta>
            <span className="date">{recipe.dietLabels}</span>
          </Card.Meta>
          <Card.Description>
            Total Time: {recipe.totalTime}, Source: {recipe.source}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            Feeds {recipe.yield}
          </a>
          <a>
            <Button toggle active={active} onClick={this.handleClick} floated='right' circular icon='favorite'/>
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export default RecipeCard;
