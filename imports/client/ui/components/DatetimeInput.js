import React from 'react'
import Datetime from 'react-datetime'

export default function DatetimeInput (props) {
  return <Datetime
    dateFormat="YYYY-MM-DD"
    timeFormat="HH:mm:ss"
    {...props}
  />
}