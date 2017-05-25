import crypto from 'crypto'
import { Random } from 'meteor/random'
import { check } from 'meteor/check'

import settings from '../settings'

const FileService = {
  /**
   * build general file upload token
   * @param key
   * @param duration
   * @return {string} token 
   */
  buildUploadToken(key, duration) {
    check(key, String)
    check(duration, Number)

    // refer to http://support.c.163.com/md.html#!平台服务/对象存储/直传相关文档/上传凭证.md

    // build policy
    const policy = {
      Bucket: settings.nos.bucket,
      Object: key,
      Expires: new Date().getTime() + duration
    }

    // convert to json
    const policyJSON = JSON.stringify(policy)

    // do base64 encoding
    const policyBase64 = new Buffer(policyJSON).toString('base64')

    // do hmac sha1 encoding with access secrete
    const policySign = crypto.createHmac('sha256', settings.nos.accessSecret).update(policyBase64).digest('base64')

    return `UPLOAD ${settings.nos.accessKey}:${policySign}:${policyBase64}`
  },

  /**
   * build file upload token for time-capsule content image
   * @param filename
   * @returns {{key: string, token: string}} # user can only upload file with given key(object name)
   */
  buildUploadTokenForTimeCapsuleContentImage(filename) {
    check(filename, String)

    const key = `time-capsule/content/images/${Random.id()}/${filename}`
    const duration = 10 * 60 // 10 minutes
    const token = FileService.buildUploadToken(key, duration)
    return {key, token}
  }
}

export default FileService