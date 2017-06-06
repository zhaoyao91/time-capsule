import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const CollectedTimeCapsules = new Mongo.Collection('collected_time_capsules')
CollectedTimeCapsules.attachSchema(new SimpleSchema({
  userId: {
    type: String,
    index: true,
  },

  timeCapsuleId: {
    type: String,
    index: true,
  },

  // redundant data

  name: {
    type: String,
    optional: true,
  },

  openTime: {
    type: Date,
    optional: true,
  },

  createdAt: {
    type: Date,
    optional: true,
  }
}))

export default CollectedTimeCapsules