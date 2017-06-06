import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'

import { need } from '../common/utils/settings'

export default {
  nos: {
    bucket: need(prop('settings.public.nos.bucket', Meteor)),
    domain: need(prop('settings.public.nos.domain', Meteor)),
  }
}
