import OSS from 'ali-oss'

const STS = OSS.Wrapper.STS

import settings from '../settings'

const sts = new STS({
  accessKeyId: settings.ali.accessKeyId,
  accessKeySecret: settings.ali.accessKeySecret,
})

const Service = {
  /**
   * build oss sts token for client
   * @async
   * @return token
   */
  async buildClientToken() {
    const result = await sts.assumeRole(settings.ali.roles.client.arn, settings.ali.roles.client.policy)

    if (result.res.status === 200) return result.credentials
    else throw res
  }
}

export default Service

export { sts }