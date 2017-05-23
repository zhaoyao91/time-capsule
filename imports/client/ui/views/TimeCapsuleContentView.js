import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'

import defineComponent from '../../hocs/define_component'
import { convertRawToEditorState } from '../../utils/draftjs'

export default compose(
  defineComponent('TimeCapsuleContentView', {
    rawContent: PropTypes.object
  }),
  withProps(({rawContent}) => ({
    editorState: convertRawToEditorState(rawContent)
  })),
)(function TimeCapsuleContentView ({styles, editorState}) {
  return <Editor editorState={editorState} toolbarHidden readOnly/>
})