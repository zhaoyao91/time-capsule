import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import TimeCapsuleService from '../../services/time_capsule'

Meteor.methods({
  /**
   * create time capsule
   * @param timeCapsule
   * @param timeCapsule.content
   * @param timeCapsule.openTime
   * @return id
   */
  'TimeCapsule.create'(timeCapsule) {
    check(timeCapsule, {
      openTime: Date,
      content: String
    })

    return TimeCapsuleService.create(timeCapsule)
  }
})