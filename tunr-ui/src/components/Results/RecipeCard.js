import React, { Component } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import axios from 'axios';

export class RecipeCard extends Component {

  state = {
    newFavorite: {},
    favorites: {}
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
    const incomingFavorite = {
      'label':this.props.recipe.label,
      'image_url':this.props.recipe.image,
      'api_uri':this.props.recipe.uri,
      'user_id':'1'
    }
    this.setState({ active: !this.state.active })
    this.setState({ newFavorite: incomingFavorite }, () => {
      console.log(this.state.newFavorite)
      this.createFavorite(this.state.newFavorite)
    })
    
  }


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
