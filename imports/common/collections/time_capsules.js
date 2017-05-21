import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const TimeCapsules = new Mongo.Collection('time_capsules')
TimeCapsules.attachSchema(new SimpleSchema({
  content: {
    type: String
  },

  openTime: {
    type: Date
  },

  createdAt: {
    type: Date
  }
}))

export default TimeCapsules