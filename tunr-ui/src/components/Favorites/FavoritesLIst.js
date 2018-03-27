import React from 'react';
import { Card, Segment } from 'semantic-ui-react';
import FavoriteCard from './FavoriteCard';

const FavoritesList = ({favorites}) => (
  <Segment basic>
  <Card.Group centered>
    {
      favorites.map((favorite, index) => {
        return(
          <FavoriteCard 
          {...favorite}
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

export default FavoritesList