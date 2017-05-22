import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'

export default compose(
  withProps({
    styles: {
      editor: css({
        'border': '1px solid #F1F1F1',
        'padding': 5,
        'borderRadius': 2,
      })
    }
  })
)(function TimeCapsuleContentEditor ({styles, ...otherProps}) {
  return <Editor editorClassName={`${styles.editor}`} {...otherProps}/>
})