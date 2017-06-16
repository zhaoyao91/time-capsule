import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'

import { need } from '../common/utils/settings'

export default {
  ali: {
    accessKeyId: need(prop('settings.ali.accessKeyId', Meteor)),
    accessKeySecret: need(prop('settings.ali.accessKeySecret', Meteor)),
    roles: {
      client: {
        arn: need(prop('settings.ali.roles.client.arn', Meteor)),
        policy: need(prop('settings.ali.roles.client.policy', Meteor))
      }
    }
  }
}
