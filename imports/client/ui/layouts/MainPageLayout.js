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
      })
    }
  })
)(function MainPageLayout ({styles, children}) {
  return <div {...styles.layout}>
    <div {...styles.top}>
      <MainNavbar/>
    </div>
    <div {...styles.main}>
      <Container>
        {children}
      </Container>
    </div>
  </div>
})