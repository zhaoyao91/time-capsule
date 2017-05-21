import { TimeCapsules } from '../collections'
import { check } from'meteor/check'

const TimeCapsuleService = {
  /**
   * create a time capsule
   * @param timeCapsule
   * @param timeCapsule.content
   * @param timeCapsule.openTime
   * @return id
   */
  create(timeCapsule) {
    check(timeCapsule, {
      content: String,
      openTime: Date
    })

    const newTimeCapsule = {
      content: timeCapsule.content,
      openTime: timeCapsule.openTime,
      createdAt: new Date()
    }

    return TimeCapsules.insert(newTimeCapsule)
  }
}

export default TimeCapsuleService