import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { css }from 'glamor'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import MainPageLayout from '../layouts/MainPageLayout'
import DatetimeInput from '../views/DatetimeInput'
import withAlert from '../../hocs/with_alert'
import withMeteor from '../../hocs/with_meteor'

export default compose(
  withProps({
    styles: {
      formLayout: css({
        'paddingTop': '1rem'
      })
    }
  })
)(function CreateTimeCapsulePage ({styles}) {
  return <MainPageLayout>
    <div {...styles.formLayout}>
      <CreateTimeCapsuleForm/>
    </div>
  </MainPageLayout>
})

const CreateTimeCapsuleForm = compose(
  withAlert('alert'),
  withMeteor('meteor'),
  withRouter,
  withState('openTime', 'setOpenTime', () => new Date()),
  withState('content', 'setContent', ''),
  withHandlers({
    onOpenTimeChange: ({setOpenTime}) => time => setOpenTime(time),
    onContentChange: ({setContent}) => e => setContent(e.target.value),
    onSubmit: ({openTime, content, alert, meteor, history}) => e => {
      e.preventDefault()

      if (typeof openTime === 'string') {
        return alert.error('请输入正确的开启时间')
      }

      const newTimeCapsule = {
        openTime: openTime,
        content: content,
      }

      meteor.call('TimeCapsule.create', newTimeCapsule, (err, id) => {
        if (err) {
          console.error(err)
          alert.error('创建失败')
        }
        else {
          const openTimeString = moment(openTime).format('YYYY-MM-DD HH:mm:ss')
          history.push(`/time-capsules/${id}/created?openTimeString=${openTimeString}`)
        }
      })
    },
  }),
)(function CreateTimeCapsuleForm ({onSubmit, openTime, onOpenTimeChange, content, onContentChange}) {
  return <Form onSubmit={onSubmit}>
    <FormGroup>
      <Label>开启时间</Label>
      <DatetimeInput value={openTime} onChange={onOpenTimeChange}/>
    </FormGroup>
    <FormGroup>
      <Label>内容</Label>
      <Input type="textarea" value={content} onChange={onContentChange}/>
    </FormGroup>
    <Button color="primary">创建</Button>
  </Form>
})