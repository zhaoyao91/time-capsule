import { CollectedTimeCapsules } from '../collections'
import { check, Match } from'meteor/check'
import { prop, pick, defaults, compose } from 'lodash/fp'
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

    const doc = compose(
      defaults({name: timeCapsuleId}),
      pick(['name', 'openTime', 'createdAt']),
    )(timeCapsule)

    CollectedTimeCapsules.upsert({userId, timeCapsuleId}, {$set: doc})
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

  /**
   * update name of collected time capsule
   * @param userId
   * @param timeCapsuleId
   * @param name
   */
  updateName(userId, timeCapsuleId, name) {
    check(userId, String)
    check(timeCapsuleId, String)
    check(name, String)

    CollectedTimeCapsules.update({userId, timeCapsuleId}, {$set: {name}})
  }
}

export default CollectedTimeCapsuleService