import React from 'react'
import { Random } from 'meteor/random'

export default function (name) {
  return function (Component) {
    return class WithId extends React.Component {
      _id = Random.id()
      render () {
        return <Component {...{[name]: this._id}} {...this.props}/>
      }
    }
  }
}