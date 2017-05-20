import React from 'react'
import { Button } from 'reactstrap'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'
import { Link } from 'react-router-dom'

export default compose(
  withProps({
    styles: {
      page: css({
        'width': '100vw',
        'height': '100vh',
        'display': 'flex'
      }),
      contentBox: css({
        'margin': 'auto'
      }),
      headerBox: css({
        'marginBottom': '1rem',
        '& > *': {
          'margin': '0'
        }
      }),
      buttonsBox: css({
        'display': 'flex',
        'justifyContent': 'space-between'
      })
    }
  })
)(function HomePage ({styles}) {
  return <div {...styles.page}>
    <div {...styles.contentBox}>
      <div {...styles.headerBox}>
        <h1>时光胶囊</h1>
      </div>
      <div {...styles.buttonsBox}>
        <Button color="primary" tag={Link} to="/time-capsule/create">创建</Button>
        <Button color="primary" tag={Link} to="/time-capsule/open">打开</Button>
      </div>
    </div>
  </div>
})