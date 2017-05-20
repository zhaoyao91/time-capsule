import React from 'react'
import { Button } from 'reactstrap'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'

import MainPageLayout from '../layouts/MainPageLayout'

export default compose(
  withProps({
    styles: {}
  })
)(function CreateTimeCapsulePage ({styles}) {
  return <MainPageLayout>
    <p>create time capsule</p>
  </MainPageLayout>
})