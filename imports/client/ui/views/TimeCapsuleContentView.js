import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'
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
  withProps({
    styles: {
      editor: css({
        'border': '1px solid #F1F1F1',
        'padding': 5,
        'borderRadius': 2,
      })
    }
  })
)(function TimeCapsuleContentView ({styles, editorState}) {
  return <Editor editorClassName={`${styles.editor}`} editorState={editorState} toolbarHidden readOnly/>
})