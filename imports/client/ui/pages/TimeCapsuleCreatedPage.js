import React, { Component } from 'react'
import { Alert, Popover, PopoverContent, Jumbotron, Button } from 'reactstrap'
import { withProps, withHandlers, withState } from 'recompose'
import { withRouter, Link } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Meteor } from 'meteor/meteor'

import LinkText from '../components/LinkText'
import MainPageLayout from '../layouts/MainPageLayout'
import withRouteQuery from '../../hocs/with_route_query'
import withViewId from '../../hocs/with_view_id'
import withRouteParams from '../../hocs/with_route_params'
import withCurrentUser from '../../hocs/with_current_user'
import withAlert from '../../hocs/with_alert'

@withRouter
@withRouteQuery('query')
@withRouteParams('params')
@withProps(({params, query}) => ({
  timeCapsuleId: params.timeCapsuleId,
  openTimeString: query.openTimeString
}))
@withCurrentUser('currentUser')
@withAlert('alert')
@withHandlers({
  collectTimeCapsule: ({timeCapsuleId, currentUser, alert}) => () => {
    if (currentUser.loggingIn || !currentUser.user) {
      alert.error('登录后才能收藏胶囊')
    }
    else {
      Meteor.call('CollectedTimeCapsule.collect', timeCapsuleId, (err) => {
        if (err) {
          console.error(err)
          alert.error('收藏失败')
        }
        else {
          alert.success('收藏成功')
        }
      })
    }
  }
})
export default class TimeCapsuleCreatedPage extends Component {
  render () {
    const {timeCapsuleId, openTimeString, collectTimeCapsule} = this.props
    return <MainPageLayout>
      <Alert color="success">创建成功！</Alert>
      <p>
        胶囊ID：
        <span>{timeCapsuleId}</span>
        （<ClickCopyText text={timeCapsuleId}>复制</ClickCopyText>）
      </p>
      <p>开启时间：{openTimeString}</p>
      <p>请妥善保管好您的胶囊ID，并在开启时间之后使用它来开启胶囊。</p>
      <div className="d-flex justify-content-end">
        <Button color="primary" className="mr-2" tag={Link} to={`/time-capsules/${timeCapsuleId}`}>打开胶囊</Button>
        <Button color="primary" onClick={collectTimeCapsule}>收藏胶囊</Button>
      </div>
    </MainPageLayout>
  }
}

@withViewId('id')
@withState('isOpen', 'setOpen', false)
@withHandlers({
  toggleOpen: ({setOpen, isOpen}) => () => setOpen(!isOpen)
})
class ClickCopyText extends Component {
  render () {
    const {id, text, children, isOpen, toggleOpen} = this.props
    return <span>
    <CopyToClipboard text={text}>
      <LinkText id={id} onClick={toggleOpen}>{children}</LinkText>
    </CopyToClipboard>
    <Popover placement="top" isOpen={isOpen} target={id} toggle={toggleOpen}>
      <PopoverContent>复制成功</PopoverContent>
    </Popover>
  </span>
  }
}