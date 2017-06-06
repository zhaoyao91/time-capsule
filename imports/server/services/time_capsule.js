import { TimeCapsules } from '../collections'
import { check, Match } from'meteor/check'

const TimeCapsuleService = {
  /**
   * create a time capsule
   * @param timeCapsule
   * @param [timeCapsule.name]
   * @param [timeCapsule.description]
   * @param [timeCapsule.rawContent]
   * @param timeCapsule.openTime
   * @return id
   */
  create(timeCapsule) {
    check(timeCapsule, {
      name: Match.Optional(String),
      description: Match.Optional(String),
      rawContent: Match.Optional(Object),
      openTime: Date
    })

    const newTimeCapsule = {
      ...timeCapsule,
      createdAt: new Date()
    }

    return TimeCapsules.insert(newTimeCapsule)
  },

  /**
   * find a time capsule by id
   * @param id
   * @return timeCapsule | null
   */
  findOneById(id) {
    return TimeCapsules.findOne(id)
  },

  /**
   * check if a time capsule exists
   * @param id
   * @return {boolean} result
   */
  exists(id) {
    return TimeCapsules.find({_id: id}, {fields: {_id: 1}, limit: 1}).count() > 0
  },

  /**
   * check if a time capsule is open
   * @param timeCapsule
   * @param currentTime
   * @return {boolean}
   */
  isOpen(timeCapsule, currentTime) {
    return timeCapsule.openTime <= currentTime
  }
}

export default TimeCapsuleService