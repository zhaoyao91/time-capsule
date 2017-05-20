import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import CreateTimeCapsulePage from './pages/CreateTimeCapsulePage'

export default function Routes () {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/time-capsule/create" component={CreateTimeCapsulePage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>
}