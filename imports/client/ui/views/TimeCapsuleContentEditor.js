import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'

export default compose(
  withProps({
    toolbar: {
      options: ['blockType', 'fontSize', 'fontFamily', 'inline', 'list', 'colorPicker', 'link', 'embedded', 'image'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
      },
    }
  }),
  withProps({
    styles: {
      wrapper: css({
        boxSizing: 'content-box'
      }),
      editor: css({
        'border': '1px solid #F1F1F1',
        'padding': 5,
        'borderRadius': 2,
      })
    }
  })
)(function TimeCapsuleContentEditor ({styles, toolbar, ...otherProps}) {
  return <Editor wrapperClassName={`${styles.wrapper}`} editorClassName={`${styles.editor}`} toolbar={toolbar} {...otherProps}/>
})