import React from 'react'
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'

import MainPageLayout from '../layouts/MainPageLayout'
import withMeteor from '../../hocs/with_meteor'

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
  withHandlers({
    reload: ({meteor, setError, setLoading, setTimeCapsule, timeCapsuleId}) => () => {
      setError(false)
      setLoading(true)
      setTimeCapsule(null)

      meteor.call('TimeCapsule.open', timeCapsuleId, (err, timeCapsule) => {
        setLoading(false)
        if (err) {
          console.error(err)
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
)(function TimeCapsulePage ({state, timeCapsule}) {
    return <MainPageLayout>
      {do {
        if (state === 'error') <ErrorView/>
        else if (state === 'loading') <LoadingView/>
        else if (state === 'notFound') <NotFoundView/>
        else if (state === 'notOpen') <NotOpenView timeCapsule={timeCapsule}/>
        else if (state === 'open') <OpenView timeCapsule={timeCapsule}/>
        else <WrontStateView/>
      }}
    </MainPageLayout>
  }
)

function LoadingView () {
  return <div>loading</div>
}

function ErrorView () {
  return <div>error</div>
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