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
   * upload file
   * @async
   * @param file
   * @param options
   * @param options.key
   * @param options.token
   */
  async uploadFile(file, options) {
    const {key, token} = options
    return await new Promise((resolve, reject) => {
      const uploader = new Uploader({onError: reject})
      uploader.addFile(file)
      const params = {
        bucketName: settings.nos.bucket,
        objectName: key,
        token: token,
      }
      uploader.upload(params, resolve)
    })
  },

  /**
   * upload time-capsule content image
   * @async
   * @param file
   * @returns key
   */
  async uploadTimeCapsuleContentImage(file) {
    file = await imageUtils.ensureMaxWidth(file, 1080)
    file.name = fileUtils.replaceBasename(file.name, Random.id())

    const {key, token} = await Meteor.async.call('File.buildUploadTokenForTimeCapsuleContentImage', file.name)
    await FileService.uploadFile(file, {key, token})

    return key
  },
}

export default FileService