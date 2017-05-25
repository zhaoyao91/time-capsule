import React from 'react'
import { css } from 'glamor'
import { withProps, compose } from 'recompose'

import MainNavbar from '../views/MainNavbar'
import Container from '../views/Container'

export default compose(
  withProps({
    styles: {
      layout: css({
        'display': 'flex',
        'flexDirection': 'column',
        'width': '100vw',
        'height': '100vh',
      }),
      top: css({
        'flexShrink': 0
      }),
      main: css({
        'height': '100%',
        'overflowY': 'auto',
      }),
      mainContainer: css({
        'minHeight': '100%',
        'paddingTop': '1rem',
        'paddingBottom': '1rem',
      })
    }
  })
)(function MainPageLayout ({styles, children}) {
  return <div {...styles.layout}>
    <div {...styles.top}>
      <MainNavbar/>
    </div>
    <div {...styles.main}>
      <Container {...styles.mainContainer}>
        {children}
      </Container>
    </div>
  </div>
})