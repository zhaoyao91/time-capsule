import React from 'react'
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { css }from 'glamor'
import { Button } from 'reactstrap'

import LinkText from '../views/LinkText'
import CenterLoading from '../views/CenterLoading'
import MainPageLayout from '../layouts/MainPageLayout'
import withMeteor from '../../hocs/with_meteor'
import withAlert from '../../hocs/with_alert'

export default compose(
  withRouter,
  withProps(({match}) => ({
    timeCapsuleId: match.params.timeCapsuleId
  })),
  withState('loading', 'setLoading', false),
  withState('error', 'setError', false),
  withState('timeCapsule', 'setTimeCapsule', null),
  withProps(({error, loading, timeCapsule}) => ({
    state: do {
      if (error) 'error'
      else if (loading) 'loading'
      else if (!timeCapsule) 'notFound'
      else if (!timeCapsule.isOpen) 'notOpen'
      else 'open'
    }
  })),
  withMeteor('meteor'),
  withAlert('alert'),
  withHandlers({
    reload: ({meteor, alert, setError, setLoading, setTimeCapsule, timeCapsuleId}) => () => {
      setError(false)
      setLoading(true)
      setTimeCapsule(null)

      meteor.call('TimeCapsule.open', timeCapsuleId, (err, timeCapsule) => {
        setLoading(false)
        if (err) {
          console.error(err)
          alert.error('打开失败')
          setError(true)
        }
        else {
          setTimeCapsule(timeCapsule)
        }
      })
    }
  }),
  lifecycle({
    componentDidMount() {
      const {reload} = this.props
      reload()
    }
  })
)(function TimeCapsulePage ({state, timeCapsule, reload}) {
    return <MainPageLayout>
      {do {
        if (state === 'error') <ErrorView reload={reload}/>
        else if (state === 'loading') <LoadingView/>
        else if (state === 'notFound') <NotFoundView/>
        else if (state === 'notOpen') <NotOpenView reload={reload} timeCapsule={timeCapsule}/>
        else if (state === 'open') <OpenView timeCapsule={timeCapsule}/>
        else <WrontStateView/>
      }}
    </MainPageLayout>
  }
)

function LoadingView () {
  return <CenterLoading/>
}

function ErrorView ({reload}) {
  return <p>
    <span>打开失败，请</span>
    <LinkText onClick={reload}>重新尝试</LinkText>
    <span>。</span>
  </p>
}

function NotFoundView () {
  return <div>not found</div>
}

function NotOpenView () {
  return <div>not open</div>
}

function OpenView () {
  return <div>open</div>
}

function WrontStateView () {
  return <div>wrong state</div>
}