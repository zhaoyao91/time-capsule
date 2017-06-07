import React, { Component } from 'react'
import { Row, Col, Button, Card, CardBlock } from 'reactstrap'
import { withProps, withHandlers, branch, renderComponent } from 'recompose'
import { Meteor } from 'meteor/meteor'
import FaClose from 'react-icons/lib/fa/close'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { SubsCache } from 'meteor/ccorcos:subs-cache'
import FaEdit from 'react-icons/lib/fa/edit'

import datetimeUtils from '../../utils/datetime'
import withMeteorData from '../../hocs/with_meteor_data'
import MainPageLayout from '../layouts/MainPageLayout'
import withAlert from '../../hocs/with_alert'
import { CollectedTimeCapsules } from '../../collections'
import withCurrentUser from '../../hocs/with_current_user'
import CenterLoading from '../components/CenterLoading'
import withStyles from '../../hocs/with_styles'
import { pointerCursor } from '../../styles/styles'
import defineComponent from '../../hocs/define_component'
import withNow from '../../hocs/with_now'
import withPrompt from '../../hocs/with_prompt'

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
@withPrompt('prompt')
@withHandlers({
  onClick: ({prompt, alert}) => () => prompt({
    header: '添加胶囊',
    label: '胶囊ID',
    cancelButton: '取消',
    confirmButton: '确定',
    validate: (timeCapsuleId) => {
      timeCapsuleId = timeCapsuleId.trim()

      if (!timeCapsuleId) {
        alert.error('胶囊ID不能为空')
        return false
      }

      return true
    },
    callback: (timeCapsuleId) => {
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
})
class CollectTimeCapsuleButton extends Component {
  render () {
    const {onClick} = this.props
    return <Button color="primary" onClick={onClick}>添加胶囊</Button>
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
@withPrompt('prompt')
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
  },
  onClickUpdateName: ({timeCapsuleId, name, prompt, alert}) => () => prompt({
    header: '修改备注名字',
    label: '备注名字',
    confirmButton: '确认修改',
    defaultValue: name,
    callback: (name) => {
      if (name !== null) {
        name = name.trim() || timeCapsuleId
        Meteor.call('CollectedTimeCapsule.updateName', timeCapsuleId, name, (err) => {
          if (err) {
            console.error(err)
            alert.error('备注名字修改失败')
          }
          else {
            alert.success('备注名字修改成功')
          }
        })
      }
    }
  })
})
@withNow('now')
@withProps(({now, openTime}) => ({
  isOpen: openTime < now,
  remainingTime: datetimeUtils.readableTimeSpan(now, openTime),
}))
@withStyles('styles', {
  titleBox: {
    fontSize: '1.5rem',
    display: 'flex',
  },
  editNameButtonWrapper: {
    flexShrink: 0,
    marginRight: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0.25rem',
  },
  titleText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  closeButtonWrapper: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem'
  }
})
class CollectedTimeCapsuleCard extends Component {
  render () {
    const {styles, name, openTime, createdAt, uncollect, goTimeCapsule, isOpen, remainingTime, onClickUpdateName} = this.props
    return <Card>
      <CardBlock>
        <div {...styles.titleBox}>
          <div {...styles.editNameButtonWrapper}><EditNameButton onClick={onClickUpdateName}/></div>
          <div {...pointerCursor} {...styles.titleText} onClick={goTimeCapsule}>{name}</div>
        </div>
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
    return <FaClose {...pointerCursor} {...this.props}/>
  }
}

class EditNameButton extends Component {
  render () {
    return <FaEdit {...pointerCursor} {...this.props}/>
  }
}