import React from 'react'
import {
  Grid,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react'

const HomepageBody = () => {
console.log('rendered homebody1')
    return ( 
    <Segment style={{ padding: '8em 0em' }} vertical>
    <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h2' style={{ fontSize: '2em' }}>Recipe Search</Header>
            <p style={{ fontSize: '1.33em' }}>
            1.7+ million nutritionally analyzed recipes <br/>>
            Detailed macro and micronutrient data<br/>>
            Filter by calories, diets and allergens
            </p>
            <Header as='h2' style={{ fontSize: '2em' }}>Nutrition Analysis</Header>
            <p style={{ fontSize: '1.33em' }}>
            Analyze any recipe or ingredient list<br/>>
            Automatic tagging for allergens and popular diets<br/>>
            Database of 540,000+ food items
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image
              bordered
              rounded
              size='large'
              src='https://static.pexels.com/photos/277253/pexels-photo-277253.jpeg?cs=srgb&dl=anise-aroma-art-277253.jpg&fm=jpg'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
   )
}

export default HomepageBody