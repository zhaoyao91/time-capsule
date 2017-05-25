import React from 'react'
import { css } from 'glamor'
import { withProps, compose } from 'recompose'

import MainNavbar from '../views/MainNavbar'
import Container from '../views/Container'

export default compose(
  withProps({
    styles: {
      mainContainer: css({
        'paddingTop': '1rem',
        'paddingBottom': '1rem',
      })
    }
  })
)(function MainPageLayout ({styles, children}) {
  return <div>
    <MainNavbar/>
    <Container {...styles.mainContainer}>
      {children}
    </Container>
  </div>
})