import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'
import { css }from 'glamor'

export default compose(
  withProps({
    toolbar: {
      options: ['blockType', 'inline', 'list', 'colorPicker', 'link', 'embedded', 'image'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
      },
      blockType: {
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      },
    },
    localization: {
      locale: 'zh'
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
)(function TimeCapsuleContentEditor ({styles, toolbar, localization, ...otherProps}) {
  return <Editor wrapperClassName={`${styles.wrapper}`} editorClassName={`${styles.editor}`} toolbar={toolbar} localization={localization} {...otherProps}/>
})