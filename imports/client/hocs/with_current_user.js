import withMeteorData from './with_meteor_data'
import { Meteor } from 'meteor/meteor'

export default function (name) {
  return withMeteorData(() => {
    return {
      [name]: {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
      }
    }
  })
}
