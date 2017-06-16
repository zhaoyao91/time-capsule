import React from 'react'
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import CreateTimeCapsulePage from './pages/CreateTimeCapsulePage'
import TimeCapsuleCreatedPage from './pages/TimeCapsuleCreatedPage'
import OpenTimeCapsulePage from './pages/OpenTimeCapsulePage'
import TimeCapsulePage from './pages/TimeCapsulePage'

export default function Routes ({history}) {
  return <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/time-capsule/create" component={CreateTimeCapsulePage}/>
      <Route exact path="/time-capsule/open" component={OpenTimeCapsulePage}/>
      <Route exact path="/time-capsules/:timeCapsuleId/created" component={TimeCapsuleCreatedPage}/>
      <Route exact path="/time-capsules/:timeCapsuleId" component={TimeCapsulePage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
}