import { Meteor } from 'meteor/meteor'

import settings from '../settings'

const Service = {
  async buildOSSClient() {
    const token = await Meteor.async.call('OSS.buildClientToken')
    return new OSS.Wrapper({
      region: settings.ali.oss.region,
      bucket: settings.ali.oss.bucket,
      accessKeyId: token.AccessKeyId,
      accessKeySecret: token.AccessKeySecret,
      stsToken: token.SecurityToken
    })
  },

  async uploadFile(key, file, options) {
    const client = await Service.buildOSSClient()
    return await client.multipartUpload(key, file, options)
  },

  getURL(key) {
    return `//${settings.ali.oss.domain}/${key}`
  }
}

export default Service