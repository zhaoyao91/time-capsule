import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { compose, withProps } from 'recompose'

import withFileService from '../../hocs/with_file_service'

export default compose(
  withFileService('FileService'),
  withProps(({FileService}) => ({
    toolbar: {
      options: ['blockType', 'inline', 'list', 'colorPicker', 'link', 'embedded', 'image'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
      },
      blockType: {
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      },
      image: {
        async uploadCallback(file) {
          const key = await FileService.uploadTimeCapsuleContentImage(file)
          const url = FileService.getUrl(key)
          return {data: {link: url}}
        }
      }
    },
    localization: {
      locale: 'zh'
    }
  })),
)(function TimeCapsuleContentEditor ({styles, toolbar, localization, ...otherProps}) {
  return <Editor toolbar={toolbar} localization={localization} {...otherProps}/>
})