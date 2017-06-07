import React from 'react'
import Alert from 'react-s-alert'

import Routes from './Routes'
import PromptModals from './views/PromptModals'
import ConfirmModals from './views/ConfirmModals'

export default function App ({history}) {
  return <div>
    <Routes history={history}/>
    <Alert stack={{limit: 3}} effect='slide'/>
    <PromptModals/>
    <ConfirmModals/>
  </div>
}