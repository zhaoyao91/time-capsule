import React from 'react'
import { css }from 'glamor'
import { compose, withProps } from 'recompose'

import Loading from './Loading'

export default compose(
  withProps({
    styles: {
      container: css({
        'height': '100%',
        'width': '100%',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
      })
    }
  })
)(function CenterLoading ({styles}) {
    return <div {...styles.container}>
      <Loading/>
    </div>
  }
)