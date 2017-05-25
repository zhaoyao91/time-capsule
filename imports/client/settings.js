import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'

export default {
  nos: {
    bucket: need(prop('settings.public.nos.bucket', Meteor)),
    domain: need(prop('settings.public.nos.domain', Meteor)),
  }
}

function must (value) {
  if (value === undefined) {
    throw new Error('some settings field is required.')
  }
  return value
}

function need (value) {
  if (value === undefined) {
    console.warn('some settings field is needed.', new Error().stack)
  }
  return value
}