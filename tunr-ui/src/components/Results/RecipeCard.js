import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export class RecipeCard extends Component {
  render() {
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
        </Card.Content>
      </Card>
    );
  }
}

export default RecipeCard;
