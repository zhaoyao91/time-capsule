import React from 'react'
import Alert from 'react-s-alert'

import Routes from './Routes'

export default function App () {
  return <div>
    <Routes/>
    <Alert stack={{limit: 3}} effect='slide'/>
  </div>
}