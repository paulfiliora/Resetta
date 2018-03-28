import React, { Component } from "react";
import { Card, Icon, Image, Button, Modal, Header, List } from "semantic-ui-react";
import axios from "axios";
import RecipeItems from "./RecipeItems"

export class RecipeCard extends Component {
  state = {
    newFavorite: {},
    favorites: {},
    open: false 
  };

  createFavorite = async (favorite, index) => {
    try {
      const newFavoriteResponse = await axios.post(`/favorites`, favorite);

      const updatedFavoritesList = [...this.state.favorites];
      updatedFavoritesList.push(newFavoriteResponse.data);
      this.setState({ favorites: updatedFavoritesList });
    } catch (error) {
      console.log("Error creating new Favorite!");
      console.log(error);
    }
  };

  handleFavClick = () => {
    const incomingFavorite = {
      label: this.props.recipe.label,
      image_url: this.props.recipe.image,
      api_uri: this.props.recipe.uri,
      user_id: "1"
    };
    this.setState({ active: !this.state.active });
    this.setState({ newFavorite: incomingFavorite }, () => {
      this.createFavorite(this.state.newFavorite);
    });
  };

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  
  render() {
    const { active } = this.state;
    const recipe = this.props.recipe;

    const { open, dimmer } = this.state

    const inlineStyle = {
      modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    // console.log(recipe)

    const cals = Number.parseInt(recipe.calories, 10)/recipe.yield


    return (
      <Card >
        <Image onClick={this.show('blurring')} src={recipe.image} />
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
            <Button
              toggle
              active={active}
              onClick={this.handleFavClick}
              floated="right"
              circular
              icon="favorite"
            />
          </a>
        </Card.Content>

        <Modal dimmer={dimmer} open={open} onClose={this.close} style={inlineStyle.modal}>
          <Modal.Header>{recipe.label}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={recipe.image} />
            <Modal.Description>
              <Header as='h4'>Calories: {cals}</Header>
              <Header as='h4'>Yields: {recipe.yield}</Header>


              <Header>Ingredients</Header>
              <List bulleted>
                {recipe.ingredients.map((ingredient, index) => {
                return <RecipeItems {...ingredient} key={index} index={index} />;
                })}
              </List>              
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="See Nutrition" onClick={this.close} />
          </Modal.Actions>
        </Modal>

      </Card>
    );
  }
}

export default RecipeCard;
