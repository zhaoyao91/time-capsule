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
import ResetPasswordPage from './pages/ResetPasswordPage'
import MyTimeCapsulesPage from './pages/MyTimeCapsulesPage'

export default function Routes ({history}) {
  return <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/time-capsule/create" component={CreateTimeCapsulePage}/>
      <Route exact path="/time-capsule/open" component={OpenTimeCapsulePage}/>
      <Route exact path="/time-capsules/:timeCapsuleId/created" component={TimeCapsuleCreatedPage}/>
      <Route exact path="/time-capsules/:timeCapsuleId" component={TimeCapsulePage}/>
      <Route exact path="/reset-password/:token" component={ResetPasswordPage}/>
      <Route exact path="/my/time-capsules" component={MyTimeCapsulesPage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
}