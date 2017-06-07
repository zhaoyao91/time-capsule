import React, { Component } from 'react'
import { Row, Col, Button, Card, CardBlock } from 'reactstrap'
import { withProps, withState, withHandlers, branch, renderComponent } from 'recompose'
import { Meteor } from 'meteor/meteor'
import FaClose from 'react-icons/lib/fa/close'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { SubsCache } from 'meteor/ccorcos:subs-cache'

import datetimeUtils from '../../utils/datetime'
import withMeteorData from '../../hocs/with_meteor_data'
import MainPageLayout from '../layouts/MainPageLayout'
import PromptModal from '../components/PromptModal'
import withAlert from '../../hocs/with_alert'
import { CollectedTimeCapsules } from '../../collections'
import withCurrentUser from '../../hocs/with_current_user'
import CenterLoading from '../components/CenterLoading'
import withStyles from '../../hocs/with_styles'
import { pointerCursor } from '../../styles/styles'
import defineComponent from '../../hocs/define_component'
import withNow from '../../hocs/with_now'

@withStyles('styles', {
  collectTimeCapsuleButtonWrapper: {
    'marginBottom': '1rem'
  }
})
export default class HomePage extends Component {
  render () {
    const {styles} = this.props
    return <MainPageLayout>
      <div {...styles.collectTimeCapsuleButtonWrapper}>
        <CollectTimeCapsuleButton/>
      </div>
      <CollectedTimeCapsulesView/>
    </MainPageLayout>
  }
}

@withAlert('alert')
@withState('isOpen', 'setIsOpen', false)
@withHandlers({
  toggle: ({setIsOpen}) => () => setIsOpen(x => !x),
  validate: ({alert}) => (timeCapsuleId) => {
    timeCapsuleId = timeCapsuleId.trim()

    if (!timeCapsuleId) {
      alert.error('胶囊ID不能为空')
      return false
    }

    return true
  },
  callback: ({alert}) => (timeCapsuleId) => {
    if (timeCapsuleId !== null) {
      timeCapsuleId = timeCapsuleId.trim()
      Meteor.call('CollectedTimeCapsule.collect', timeCapsuleId, (err) => {
        if (err) {
          console.error(err)
          if (err.error === 'no-time-capsule') alert.error('没有找到这个时光胶囊')
          else alert.error('添加失败')
        }
        else {
          alert.success('添加成功')
        }
      })
    }
  }
})
class CollectTimeCapsuleButton extends Component {
  render () {
    const {isOpen, toggle, validate, callback} = this.props
    return <div>
      <Button color="primary" onClick={toggle}>添加胶囊</Button>
      <PromptModal isOpen={isOpen} toggle={toggle} header="添加胶囊" label="胶囊ID" cancelButton="取消" confirmButton="添加胶囊"
                   validate={validate} callback={callback}/>
    </div>
  }
}

@withProps({
  subsCache: new SubsCache()
})
@withCurrentUser('currentUser')
@withMeteorData(({currentUser, subsCache}) => {
  if (currentUser.loggingIn) return {ready: false}
  else if (!currentUser.user) return {ready: true, collectedTimeCapsules: []}
  else {
    const sub = subsCache.subscribe('CollectedTimeCapsule.myCollectedTimeCapsules')
    return {
      ready: sub.ready(),
      collectedTimeCapsules: CollectedTimeCapsules.find({userId: currentUser.user._id}).fetch()
    }
  }
})
@branch(({ready}) => !ready, renderComponent(CenterLoading))
@withStyles('styles', {
  row: {
    margin: '0 -0.5rem'
  },
  col: {
    marginBottom: '1rem',
    padding: '0 0.5rem'
  }
})
class CollectedTimeCapsulesView extends Component {
  render () {
    const {collectedTimeCapsules, styles} = this.props
    return <Row {...styles.row}>
      {
        collectedTimeCapsules.map(tc => (
          <Col key={tc._id} xs={12} md={6} {...styles.col}>
            <CollectedTimeCapsuleCard {...tc}/>
          </Col>
        ))
      }
    </Row>
  }
}

@defineComponent('CollectedTimeCapsuleCard', {
  timeCapsuleId: PropTypes.string,
  name: PropTypes.string,
  openTime: PropTypes.instanceOf(Date),
  createdAt: PropTypes.instanceOf(Date),
})
@withAlert('alert')
@withRouter
@withHandlers({
  uncollect: ({timeCapsuleId, alert}) => () => {
    Meteor.call('CollectedTimeCapsule.uncollect', timeCapsuleId, (err) => {
      if (err) {
        console.error(err)
        alert.error('移除失败')
      }
      else {
        alert.success('移除成功')
      }
    })
  },
  goTimeCapsule: ({history, timeCapsuleId}) => () => {
    history.push(`/time-capsules/${timeCapsuleId}`)
  }
})
@withNow('now')
@withProps(({now, openTime}) => ({
  isOpen: openTime < now,
  remainingTime: datetimeUtils.readableTimeSpan(now, openTime),
}))
@withStyles('styles', {
  title: {
    fontSize: '1.5rem'
  },
  closeButtonWrapper: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem'
  }
})
class CollectedTimeCapsuleCard extends Component {
  render () {
    const {styles, name, openTime, createdAt, uncollect, goTimeCapsule, isOpen, remainingTime} = this.props
    return <Card>
      <CardBlock>
        <div {...styles.title} {...pointerCursor} onClick={goTimeCapsule}>{name}</div>
        <div>创建时间：{datetimeUtils.format(createdAt)}</div>
        <div>开启时间：{datetimeUtils.format(openTime)}</div>
        {
          isOpen && <div className="text-success">已开启</div>
        }
        {
          !isOpen && <div>剩余时间：{remainingTime}</div>
        }
        <div {...styles.closeButtonWrapper}><CloseButton onClick={uncollect}/></div>
      </CardBlock>
    </Card>
  }
}

class CloseButton extends Component {
  render () {
    const {onClick} = this.props
    return <FaClose {...pointerCursor} onClick={onClick}/>
  }
}