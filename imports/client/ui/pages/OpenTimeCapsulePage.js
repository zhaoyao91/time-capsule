import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { css }from 'glamor'
import { withRouter } from 'react-router-dom'

import MainPageLayout from '../layouts/MainPageLayout'

export default compose(
  withProps({
    styles: {
      formLayout: css({
        'paddingTop': '1rem'
      })
    }
  })
)(function OpenTimeCapsulePage ({styles}) {
  return <MainPageLayout>
    <div {...styles.formLayout}>
      <OpenTimeCapsuleForm/>
    </div>
  </MainPageLayout>
})

const OpenTimeCapsuleForm = compose(
  withRouter,
  withState('timeCapsuleId', 'setTimeCapsuleId', ''),
  withHandlers({
    onTimeCapsuleIdChange: ({setTimeCapsuleId}) => e => setTimeCapsuleId(e.target.value),
    onSubmit: ({timeCapsuleId, history}) => e => {
      e.preventDefault()
      history.push(`/time-capsules/${timeCapsuleId}`)
    }
  })
)(function OpenTimeCapsuleForm ({onSubmit, timeCapsuleId, onTimeCapsuleIdChange}) {
  return <Form onSubmit={onSubmit}>
    <FormGroup>
      <Label>胶囊ID</Label>
      <Input value={timeCapsuleId} onChange={onTimeCapsuleIdChange}/>
    </FormGroup>
    <Button color="primary">打开</Button>
  </Form>
})