import React from 'react'
import { compose, withProps, withState, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import { css }from 'glamor'
import { Alert, Card, CardBlock, CardText } from 'reactstrap'
import moment from 'moment'

import TimeCapsuleContentView from '../views/TimeCapsuleContentView'
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

const TimeCapsuleView = compose(
  withProps({
    styles: {}
  })
)(function TimeCapsuleCard ({timeCapsule, styles}) {
  return <div>
    <p>胶囊ID：{timeCapsule._id}</p>
    <p>创建时间：{moment(timeCapsule.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
    <p>开启时间：{moment(timeCapsule.openTime).format('YYYY-MM-DD HH:mm:ss')}</p>
    {
      timeCapsule.rawContent && <div>
        <p>内容：</p>
        <TimeCapsuleContentView rawContent={timeCapsule.rawContent}/>
      </div>
    }
  </div>
})