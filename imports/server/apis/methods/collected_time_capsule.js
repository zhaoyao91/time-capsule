import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

import CollectedTimeCapsuleService from '../../services/collected_time_capsule'

Meteor.methods({
  /**
   * collect time capsule
   * @param timeCapsuleId
   */
  'CollectedTimeCapsule.collect'(timeCapsuleId) {
    check(timeCapsuleId, String)

    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('not-login', 'user must login')
    }

    CollectedTimeCapsuleService.collect(userId, timeCapsuleId)
  },

  /**
   * uncollect a time capsule
   * @param timeCapsuleId
   * @constructor
   */
  'CollectedTimeCapsule.uncollect'(timeCapsuleId) {
    check(timeCapsuleId, String)

    const userId = this.userId
    if (!userId) {
      throw new Meteor.Error('not-login', 'user must login')
    }

    CollectedTimeCapsuleService.uncollect(userId, timeCapsuleId)
  },
})