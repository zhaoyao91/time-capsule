import React, { Component } from 'react'
import { Mongo } from 'meteor/mongo'
import { Random } from 'meteor/random'

import withMeteorData from '../../hocs/with_meteor_data'
import PromptModal from '../components/PromptModal'

const Attempts = new Mongo.Collection(null)

@withMeteorData(() => ({
  attempts: Attempts.find({}).fetch()
}))
export default class PromptModals extends Component {
  render () {
    const {attempts} = this.props
    return <div>
      {
        attempts.map(attempt => (
          <PromptModal key={attempt._id} {...attempt}/>
        ))
      }
    </div>
  }
}

/**
 * @param options
 * @param options.header
 * @param options.label
 * @param options.cancelButton
 * @param options.confirmButton
 * @param options.defaultValue
 * @param options.validate
 * @param options.callback
 */
export function prompt (options) {
  const id = Random.id()
  const attempt = {
    _id: id,
    ...options,
    isOpen: true,
    toggle: () => {
      const attempt = Attempts.findOne(id)
      if (!attempt) {
        return console.warn('attempt does not exist')
      }
      Attempts.update(id, {$set: {isOpen: !attempt.isOpen}})
      if (attempt.isOpen) {
        setTimeout(() => Attempts.remove(id), 10 * 1000)
      }
    },
  }
  Attempts.insert(attempt)
}