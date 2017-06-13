import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'

import { need } from '../common/utils/settings'

export default {
  nos: {
    bucket: need(prop('settings.public.nos.bucket', Meteor)),
    accessKey: need(prop('settings.nos.accessKey', Meteor)),
    accessSecret: need(prop('settings.nos.accessSecret', Meteor)),
  },
  emailTemplates: {
    from: need(prop('settings.emailTemplates.from', Meteor)),
  },
}
