import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { css }from 'glamor'

import MainPageLayout from '../layouts/MainPageLayout'
import DatetimeInput from '../views/DatetimeInput'

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
  withState('openTime', 'setOpenTime', new Date()),
  withState('content', 'setContent', ''),
  withHandlers({
    onOpenTimeChange: ({setOpenTime}) => time => setOpenTime(time),
    onContentChange: ({setContent}) => e => setContent(e.target.value),
    onSubmit: ({openTime, content}) => e => {
      e.preventDefault()
      console.log({openTime, content})
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