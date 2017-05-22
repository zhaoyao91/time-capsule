import React from 'react'
import { Random } from 'meteor/random'

export default function (name) {
  return function (Component) {
    return class WithViewId extends React.Component {
      _id = `view_id_${Random.id()}`
      render () {
        return <Component {...{[name]: this._id}} {...this.props}/>
      }
    }
  }
}