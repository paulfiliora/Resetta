import React from 'react'
import { Card, Segment } from 'semantic-ui-react'
import RecipeCard from './RecipeCard'

const RecipeList = ({results}) => (
  <Segment basic>
  <Card.Group centered>
    {
      results.map((result, index) => {
        return(
          <RecipeCard 
          {...result}
          key={index}
          index={index}
          />
        )
      }
    )
    }
  </Card.Group>
  </Segment>
)

export default RecipeList