import React from 'react'
import { Popover, PopoverContent, Jumbotron } from 'reactstrap'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { css }from 'glamor'
import { withRouter } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'

import LinkText from '../components/LinkText'
import MainPageLayout from '../layouts/MainPageLayout'
import withRouteQuery from '../../hocs/with_route_query'
import withViewId from '../../hocs/with_view_id'
import withRouteParams from '../../hocs/with_route_params'

export default compose(
  withRouter,
  withRouteQuery('query'),
  withRouteParams('params'),
  withProps(({params, query}) => ({
    timeCapsuleId: params.timeCapsuleId,
    openTimeString: query.openTimeString
  })),
  withProps({
    styles: {
      jumbotron: css({
        'margin': 0,
        'padding': '1rem',
        '& > *:not(:last-child)': {
          'marginBottom': '0.5em'
        },
        '& > *:last-child': {
          'marginBottom': 0
        }
      })
    }
  })
)(function TimeCapsuleCreatedPage ({styles, timeCapsuleId, openTimeString}) {
  return <MainPageLayout>
    <Jumbotron {...styles.jumbotron}>
      <h1>创建成功！</h1>
      <p>
        胶囊ID：
        <span>{timeCapsuleId}</span>
        （<ClickCopyText text={timeCapsuleId}>复制</ClickCopyText>）
      </p>
      <p>开启时间：{openTimeString}</p>
      <p>请妥善保管好您的胶囊ID，并在开启时间之后使用它来开启胶囊。</p>
    </Jumbotron>
  </MainPageLayout>
})

const ClickCopyText = compose(
  withViewId('id'),
  withState('isOpen', 'setOpen', false),
  withHandlers({
    toggleOpen: ({setOpen, isOpen}) => () => setOpen(!isOpen)
  }),
)(function ClickCopyText ({id, text, children, isOpen, toggleOpen}) {
  return <span>
    <CopyToClipboard text={text}>
      <LinkText id={id} onClick={toggleOpen}>{children}</LinkText>
    </CopyToClipboard>
    <Popover placement="top" isOpen={isOpen} target={id} toggle={toggleOpen}>
      <PopoverContent>复制成功</PopoverContent>
    </Popover>
  </span>
})