import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'

import { need } from '../common/utils/settings'

export default {
  ali: {
    oss: {
      region: need(prop('settings.public.ali.oss.region', Meteor)),
      bucket: need(prop('settings.public.ali.oss.bucket', Meteor)),
      domain: need(prop('settings.public.ali.oss.domain', Meteor)),
    }
  }
}
