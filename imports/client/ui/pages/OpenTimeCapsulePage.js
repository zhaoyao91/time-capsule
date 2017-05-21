import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { css }from 'glamor'
import { withRouter } from 'react-router-dom'
import { trim }from 'lodash/fp'

import MainPageLayout from '../layouts/MainPageLayout'
import withAlert from '../../hocs/with_alert'

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
    <Button color="primary">打开</Button>
  </Form>
})