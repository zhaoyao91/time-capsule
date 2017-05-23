import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'

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
)(function TimeCapsuleContentEditor ({styles, toolbar, localization, ...otherProps}) {
  return <Editor toolbar={toolbar} localization={localization} {...otherProps}/>
})