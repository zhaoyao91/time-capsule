import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const TimeCapsules = new Mongo.Collection('time_capsules')
TimeCapsules.attachSchema(new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },

  description: {
    type: String,
    optional: true,
  },

  rawContent: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  openTime: {
    type: Date
  },

  createdAt: {
    type: Date
  }
}))

export default TimeCapsules