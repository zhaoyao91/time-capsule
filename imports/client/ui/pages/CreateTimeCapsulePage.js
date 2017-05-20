import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withProps } from 'recompose'
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

function CreateTimeCapsuleForm () {
  return <Form>
    <FormGroup>
      <Label>开启时间</Label>
      <DatetimeInput/>
    </FormGroup>
    <FormGroup>
      <Label>内容</Label>
      <Input type="textarea"/>
    </FormGroup>
    <Button color="primary">创建</Button>
  </Form>
}