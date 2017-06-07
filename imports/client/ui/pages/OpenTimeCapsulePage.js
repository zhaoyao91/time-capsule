import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withState, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import { trim }from 'lodash/fp'

import MainPageLayout from '../layouts/MainPageLayout'
import withAlert from '../../hocs/with_alert'

export default function OpenTimeCapsulePage () {
  return <MainPageLayout>
    <OpenTimeCapsuleForm/>
  </MainPageLayout>
}

const OpenTimeCapsuleForm = compose(
  withRouter,
  withAlert('alert'),
  withState('timeCapsuleId', 'setTimeCapsuleId', ''),
  withHandlers({
    onTimeCapsuleIdChange: ({setTimeCapsuleId}) => e => setTimeCapsuleId(e.target.value),
    onSubmit: ({timeCapsuleId, history, alert}) => e => {
      e.preventDefault()

      timeCapsuleId = trim(timeCapsuleId)
      if (!timeCapsuleId) {
        return alert.error('请输入胶囊ID')
      }

      history.push(`/time-capsules/${timeCapsuleId}`)
    }
  })
)(function OpenTimeCapsuleForm ({onSubmit, timeCapsuleId, onTimeCapsuleIdChange}) {
  return <Form onSubmit={onSubmit}>
    <FormGroup>
      <Label>胶囊ID</Label>
      <Input value={timeCapsuleId} onChange={onTimeCapsuleIdChange}/>
    </FormGroup>
    <div className="d-flex justify-content-end">
      <Button color="primary">打开</Button>
    </div>
  </Form>
})