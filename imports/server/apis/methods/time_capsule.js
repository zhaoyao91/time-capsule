import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { pick } from 'lodash/fp'

import TimeCapsuleService from '../../services/time_capsule'

Meteor.methods({
  /**
   * create time capsule
   * @param timeCapsule
   * @param [timeCapsule.name]
   * @param [timeCapsule.description]
   * @param [timeCapsule.rawContent]
   * @param timeCapsule.openTime
   * @return id
   */
  'TimeCapsule.create'(timeCapsule) {
    check(timeCapsule, {
      name: Match.Optional(String),
      description: Match.Optional(String),
      rawContent: Match.Optional(Object),
      openTime: Date
    })

    return TimeCapsuleService.create(timeCapsule)
  },

  /**
   * try to open a time capsule
   * if found, timeCapsule is assigned an extra field `isOpen`
   * if isOpen, then it contains all fields
   * else it only contains public fields
   * @param timeCapsuleId
   * @return timeCapsule | null
   */
  'TimeCapsule.open'(timeCapsuleId) {
    check(timeCapsuleId, String)

    const timeCapsule = TimeCapsuleService.findOneById(timeCapsuleId)
    if (!timeCapsule) return null

    const isOpen = TimeCapsuleService.isOpen(timeCapsule, new Date())
    timeCapsule.isOpen = isOpen

    if (isOpen) return timeCapsule
    else return pick(['_id', 'isOpen', 'openTime', 'name', 'description'], timeCapsule)
  },
})