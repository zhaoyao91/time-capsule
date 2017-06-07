import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { withProps } from 'recompose'
import { Random } from 'meteor/random'

import withAlert from '../../hocs/with_alert'
import FileService from '../../services/file'

@withAlert('alert')
@withProps(({alert}) => ({
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
        try {
          const key = await FileService.uploadTimeCapsuleContentImage(file)
          const url = FileService.getUrl(key)
          return {data: {link: url}}
        }
        catch (err) {
          console.error(err)
          alert.error('图片上传失败')
          throw err
        }
      }
    }
  },
  localization: {
    locale: 'zh'
  }
}))
export default class TimeCapsuleContentEditor extends Component {
  render() {
    const {toolbar, localization, ...otherProps} = this.props
    return <Editor toolbar={toolbar} localization={localization} {...otherProps}/>
  }
}