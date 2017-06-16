import { Meteor } from 'meteor/meteor'

import OSSService from '../../services/oss'

Meteor.methods({
  async 'OSS.buildClientToken'() {
    return await OSSService.buildClientToken()
  }
})