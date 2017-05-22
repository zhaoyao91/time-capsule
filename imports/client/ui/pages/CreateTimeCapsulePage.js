import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withHandlers, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import { createEmptyEditorState, convertEditorStateToRaw } from '../../utils/draftjs'
import MainPageLayout from '../layouts/MainPageLayout'
import DatetimeInput from '../views/DatetimeInput'
import withAlert from '../../hocs/with_alert'
import withMeteor from '../../hocs/with_meteor'
import TimeCapsuleContentEditor from '../views/TimeCapsuleContentEditor'

export default function CreateTimeCapsulePage () {
  return <MainPageLayout>
    <CreateTimeCapsuleForm/>
  </MainPageLayout>
}

const CreateTimeCapsuleForm = compose(
  withAlert('alert'),
  withMeteor('meteor'),
  withRouter,
  withState('openTime', 'setOpenTime', moment),
  withState('contentEditorState', 'setContentEditorState', createEmptyEditorState),
  withHandlers({
    onOpenTimeChange: ({setOpenTime}) => time => setOpenTime(time),
    onContentEditorStateChange: ({setContentEditorState}) => state => setContentEditorState(state),
    onSubmit: ({openTime, alert, meteor, history, contentEditorState}) => e => {
      e.preventDefault()

      if (typeof openTime === 'string') {
        return alert.error('请输入正确的开启时间')
      }

      const rawContent = convertEditorStateToRaw(contentEditorState)

      const newTimeCapsule = {
        openTime: openTime.toDate(),
        rawContent: rawContent,
      }

      meteor.call('TimeCapsule.create', newTimeCapsule, (err, id) => {
        if (err) {
          console.error(err)
          alert.error('创建失败')
        }
        else {
          const openTimeString = openTime.format('YYYY-MM-DD HH:mm:ss')
          history.push(`/time-capsules/${id}/created?openTimeString=${openTimeString}`)
        }
      })
    },
  })
)(function CreateTimeCapsuleForm ({onSubmit, openTime, onOpenTimeChange, contentEditorState, onContentEditorStateChange}) {
  return <Form onSubmit={onSubmit}>
    <FormGroup>
      <Label>开启时间</Label>
      <DatetimeInput value={openTime} onChange={onOpenTimeChange}/>
    </FormGroup>
    <FormGroup>
      <Label>内容</Label>
      <TimeCapsuleContentEditor editorState={contentEditorState} onEditorStateChange={onContentEditorStateChange}/>
    </FormGroup>
    <Button color="primary">创建</Button>
  </Form>
})