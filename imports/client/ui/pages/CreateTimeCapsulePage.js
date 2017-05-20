import React from 'react'
import { Button } from 'reactstrap'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'

export default compose(
  withProps({
    styles: {}
  })
)(function CreateTimeCapsulePage ({styles}) {
  return <div>
    create time capsule
  </div>
})