import React from 'react'
import { Container, Grid, Icon } from 'semantic-ui-react'
import './Layout.css'

export default function BottomBar() {
  return (
    <div className="bottom-bar no-overflow">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <p>© 2023 Your Company. All rights reserved.</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <Icon name="facebook" size="large" link />
              <Icon name="twitter" size="large" link />
              <Icon name="instagram" size="large" link />
              <Icon name="linkedin" size="large" link />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}
