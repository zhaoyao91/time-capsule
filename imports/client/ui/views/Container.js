import React from 'react'
import { css } from 'glamor'
import { withProps, compose } from 'recompose'
import { Container as ReactstrapContainer } from 'reactstrap'

import BreakPoints from '../../styles/break_points'

export default compose(
  withProps({
    styles: {
      container: css({
        [`@media (max-width: ${BreakPoints.sm - 1}px)`]: {
          'width': '100%'
        },
        [`@media (min-width: ${BreakPoints.md}px)`]: {
          'width': 720
        }
      })
    }
  })
)(function Container ({styles, ...otherProps}) {
  return <ReactstrapContainer {...otherProps} {...styles.container}/>
})