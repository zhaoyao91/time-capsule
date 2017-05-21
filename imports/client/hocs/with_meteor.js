import { Meteor } from 'meteor/meteor'
import { withProps } from 'recompose'

export default function (name) {
  return withProps({
    [name]: Meteor
  })
}