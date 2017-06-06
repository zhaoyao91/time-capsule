import { Meteor } from 'meteor/meteor'

import { CollectedTimeCapsules } from '../../collections'

Meteor.publish('CollectedTimeCapsule.myCollectedTimeCapsules', function () {
  if (!this.userId) return this.ready()
  return CollectedTimeCapsules.find({userId: this.userId})
})