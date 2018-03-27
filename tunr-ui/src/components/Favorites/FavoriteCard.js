import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

export class RecipeCard extends Component {
  render() {
    const favorite = this.props;
    // console.log(this.props)

    return (
      <Card>
        <Image src={favorite.image_url} />
        <Card.Content>
          <Card.Header>{favorite.label}</Card.Header>
          <Card.Meta>
            <span className="date">Favorited Yesterday</span>
          </Card.Meta>
          <Card.Description>
            Description
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default RecipeCard;
