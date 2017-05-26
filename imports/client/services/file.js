import { Meteor } from 'meteor/meteor'

import Uploader from '../lib/nos-js-sdk'
import settings from '../settings'
import imageUtils from '../utils/image'
import fileUtils from '../utils/file'


const FileService = {
  getUrl(key) {
    return `//${settings.nos.domain}/${key}`
  },

  /**
   * upload time-capsule content image
   * @async
   * @param file
   * @returns key
   */
  async uploadTimeCapsuleContentImage(file) {
    file = await imageUtils.ensureMaxWidth(file, 1080)
    file.name = fileUtils.changeBasename(file.name, Random.id())

    return await new Promise((resolve, reject) => {
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