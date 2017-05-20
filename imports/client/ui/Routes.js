import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'

export default function Routes () {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </BrowserRouter>
}