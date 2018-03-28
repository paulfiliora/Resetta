import React, { Component } from "react";
import { Button, Card, Image, Popup } from "semantic-ui-react";

export class RecipeCard extends Component {
  handleClick = () => {
    console.log("clicked");
  };

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
            <a>
              <Popup
                trigger={
                  <Button
                    onClick={this.handleClick}
                    floated="right"
                    color="red"
                    circular
                    icon="delete"
                  />
                }
                content="Delete from favorites"
              />
            </a>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default RecipeCard;
