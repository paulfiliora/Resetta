import React, {Component} from "react";
import { List } from "semantic-ui-react";

export class RecipeItems extends Component {
  render() {
    const recipe = this.props;

    // console.log(recipe)
    return (
        <List.Item>{recipe.text}</List.Item>
    );
  }
}

export default RecipeItems;
