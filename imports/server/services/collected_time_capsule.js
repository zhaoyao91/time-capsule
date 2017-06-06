import { CollectedTimeCapsules } from '../collections'
import { check } from'meteor/check'
import { prop, pick } from 'lodash/fp'
import { Meteor } from 'meteor/meteor'

import TimeCapsuleService from './time_capsule'

const CollectedTimeCapsuleService = {
  /**
   * collect a time capsule
   * @param userId
   * @param timeCapsuleId
   */
  collect(userId, timeCapsuleId) {
    check(userId, String)
    check(timeCapsuleId, String)

    const timeCapsule = TimeCapsuleService.findOneById(timeCapsuleId)
    if (!timeCapsule) {
      throw new Meteor.Error('no-time-capsule', 'cannot find this time-capsule')
    }

    CollectedTimeCapsules.upsert({userId, timeCapsuleId}, {$set: pick(['name', 'openTime', 'createdAt'], timeCapsule)})
  },

  /**
   * uncollect a time capsule
   * @param userId
   * @param timeCapsuleId
   */
  uncollect(userId, timeCapsuleId) {
    check(userId, String)
    check(timeCapsuleId, String)

    CollectedTimeCapsules.remove({userId, timeCapsuleId})
  },
}

export default CollectedTimeCapsuleService