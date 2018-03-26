import React from 'react'
import {
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'

const HomepageBody2 = () => {
  console.log('rendered homebody2')

 
    return (

        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"What a time-saver!"</Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"I can be as precise with meal prep as I need."</Header>
                <p style={{ fontSize: '1.33em' }}>
                  NY Sports Club Body builder
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
   )
  
}


export default HomepageBody2
