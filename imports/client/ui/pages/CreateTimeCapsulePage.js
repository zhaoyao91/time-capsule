import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { compose, withHandlers, withState, withProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import { css }from 'glamor'

import { createEmptyEditorState, convertEditorStateToRaw } from '../../utils/draftjs'
import MainPageLayout from '../layouts/MainPageLayout'
import DatetimeInput from '../views/DatetimeInput'
import withAlert from '../../hocs/with_alert'
import withMeteor from '../../hocs/with_meteor'
import TimeCapsuleContentEditor from '../views/TimeCapsuleContentEditor'
import { Tabs, Tab } from '../views/Tabs'
import TimeCapsuleView from '../views/TimeCapsuleView'
import defineComponent from '../../hocs/define_component'

export default function CreateTimeCapsulePage () {
  return <MainPageLayout>
    <CreateTimeCapsuleForm/>
  </MainPageLayout>
}

const CreateTimeCapsuleForm = compose(
  withAlert('alert'),
  withMeteor('meteor'),
  withRouter,
  withState('name', 'setName', ''),
  withState('description', 'setDescription', ''),
  withState('openTime', 'setOpenTime', moment),
  withState('contentEditorState', 'setContentEditorState', createEmptyEditorState),
  withHandlers({
    onNameChange: ({setName}) => e => setName(e.target.value),
    onDescriptionChange: ({setDescription}) => e => setDescription(e.target.value),
    onOpenTimeChange: ({setOpenTime}) => time => setOpenTime(time),
    onContentEditorStateChange: ({setContentEditorState}) => state => setContentEditorState(state),
    onSubmit: ({name, description, openTime, alert, meteor, history, contentEditorState}) => e => {
      e.preventDefault()

      if (typeof openTime === 'string') {
        return alert.error('请输入正确的开启时间')
      }

      const rawContent = convertEditorStateToRaw(contentEditorState)

      const newTimeCapsule = {
        name: name,
        description: description,
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
  }),
  withState('activeTab', 'setActiveTab', 'public-fields'),
  withProps({
    styles: {
      createButton: css({
        'marginTop': '1rem'
      })
    }
  })
)(function CreateTimeCapsuleForm
  ({
     styles,
     onSubmit,
     openTime,
     onOpenTimeChange,
     contentEditorState,
     onContentEditorStateChange,
     activeTab,
     setActiveTab,
     name,
     onNameChange,
     description,
     onDescriptionChange,
   }) {
  return <Form onSubmit={onSubmit}>
    <Tabs activeTab={activeTab} switchTab={setActiveTab}>
      <Tab tabId="public-fields" tabName="公开信息">
        <FormGroup>
          <Label>名字</Label>
          <Input value={name} onChange={onNameChange}/>
        </FormGroup>
        <FormGroup>
          <Label>描述</Label>
          <Input type="textarea" value={description} onChange={onDescriptionChange}/>
        </FormGroup>
        <FormGroup>
          <Label>开启时间</Label>
          <DatetimeInput value={openTime} onChange={onOpenTimeChange}/>
        </FormGroup>
      </Tab>
      <Tab tabId="secret-fields" tabName="私密信息">
        <FormGroup>
          <Label>内容</Label>
          <TimeCapsuleContentEditor editorState={contentEditorState} onEditorStateChange={onContentEditorStateChange}/>
        </FormGroup>
      </Tab>
      <Tab tabId="preview" tabName="预览" tabLazy>
        <TimeCapsulePreview name={name} description={description} openTime={openTime} contentEditorState={contentEditorState}/>
        <Button {...styles.createButton} color="primary">创建</Button>
      </Tab>
    </Tabs>
  </Form>
})

const TimeCapsulePreview = compose(
  defineComponent('TimeCapsulePreview', {
    name: PropTypes.string,
    description: PropTypes.string,
    openTime: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(moment)
    ]),
    contentEditorState: PropTypes.object
  }),
  withProps(({name, description, openTime, contentEditorState}) => ({
    timeCapsule: {
      _id: '（创建后自动生成）',
      createdAt: '（创建后自动生成）',
      openTime: openTime,
      name: name,
      description: description,
      rawContent: convertEditorStateToRaw(contentEditorState)
    }
  }))
)(TimeCapsuleView)