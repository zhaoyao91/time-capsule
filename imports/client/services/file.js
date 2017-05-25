import { Meteor } from 'meteor/meteor'

import Uploader from '../lib/nos-js-sdk'
import settings from '../settings'

const FileService = {
  getUrl(key) {
    return `//${settings.nos.domain}/${key}`
  },

  getUrlForTimeCapsuleContentImage(key) {
    return `${FileService.getUrl(key)}?imageView&thumbnail=1080x0&interlace=1`
  },

  /**
   * upload time-capsule content image
   * @async
   * @param file
   * @returns key
   */
  uploadTimeCapsuleContentImage(file) {
    return new Promise((resolve, reject) => {
      const uploader = new Uploader({
        onError(err) {
          reject(err)
        }
      })
      uploader.addFile(file)
      Meteor.call('File.buildUploadTokenForTimeCapsuleContentImage', file.name, (err, result) => {
        if (err) {
          reject(err)
        }
        else {
          const {key, token} = result
          const params = {
            bucketName: settings.nos.bucket,
            objectName: key,
            token: token,
          }
          uploader.upload(params, () => {
            resolve(key)
          })
        }
      })
    })
  },
}

export default FileService