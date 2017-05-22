import { TimeCapsules } from '../collections'
import { check } from'meteor/check'

const TimeCapsuleService = {
  /**
   * create a time capsule
   * @param timeCapsule
   * @param timeCapsule.rawContent
   * @param timeCapsule.openTime
   * @return id
   */
  create(timeCapsule) {
    check(timeCapsule, {
      rawContent: Object,
      openTime: Date
    })

    const newTimeCapsule = {
      rawContent: timeCapsule.rawContent,
      openTime: timeCapsule.openTime,
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