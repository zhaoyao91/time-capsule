import React from 'react'
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Alert } from 'reactstrap'
import { Meteor } from 'meteor/meteor'

import CenterLoading from '../components/CenterLoading'
import MainPageLayout from '../layouts/MainPageLayout'
import withAlert from '../../hocs/with_alert'
import TimeCapsuleView from '../views/TimeCapsuleView'

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
  withAlert('alert'),
  withHandlers({
    reload: ({alert, setError, setLoading, setTimeCapsule, timeCapsuleId}) => () => {
      setError(false)
      setLoading(true)
      setTimeCapsule(null)

      Meteor.call('TimeCapsule.open', timeCapsuleId, (err, timeCapsule) => {
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
        if (state === 'error') <ErrorView/>
        else if (state === 'loading') <LoadingView/>
        else if (state === 'notFound') <NotFoundView/>
        else if (state === 'notOpen') <NotOpenView reload={reload} timeCapsule={timeCapsule}/>
        else if (state === 'open') <OpenView timeCapsule={timeCapsule}/>
        else <WrongStateView/>
      }}
    </MainPageLayout>
  }
)

function LoadingView () {
  return <CenterLoading/>
}

function ErrorView () {
  return <Alert color="danger">打开失败。</Alert>
}

function NotFoundView () {
  return <Alert color="info">没有找到这个胶囊。</Alert>
}

function NotOpenView ({reload, timeCapsule}) {
  return <div>
    <Alert color="warning">尚未到达开启时间，无法查看胶囊内容。</Alert>
    <TimeCapsuleView timeCapsule={timeCapsule}/>
  </div>
}

function OpenView ({timeCapsule}) {
  return <div>
    <TimeCapsuleView timeCapsule={timeCapsule}/>
  </div>
}

function WrongStateView () {
  return <Alert color="danger">状态错误。</Alert>
}
