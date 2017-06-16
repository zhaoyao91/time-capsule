import { Random } from 'meteor/random'

import OSSService from '../services/oss'
import imageUtils from '../utils/image'

const FileService = {
  /**
   * upload time-capsule content image
   * @async
   * @param file
   * @returns url
   */
  async uploadTimeCapsuleContentImage(file) {
    const key = `time-capsule/content/images/${Random.id()}`
    file = await imageUtils.ensureMaxWidth(file, 1080)
    file = new File([file], file.name)

    await OSSService.uploadFile(key, file)

    return OSSService.getURL(key)
  },
}

export default FileService