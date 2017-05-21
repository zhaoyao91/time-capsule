import React from 'react'
import { Popover, PopoverContent, Jumbotron } from 'reactstrap'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { css }from 'glamor'
import { withRouter } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'

import MainPageLayout from '../layouts/MainPageLayout'
import withParsedQueryObject from '../../hocs/with_parsed_query_object'
import withId from '../../hocs/with_id'

export default compose(
  withRouter,
  withParsedQueryObject('query'),
  withProps(({match, query}) => ({
    timeCapsuleId: match.params.timeCapsuleId,
    openTimeString: query.openTimeString
  })),
  withProps({
    styles: {
      jumbotron: css({
        'margin': 0,
        'padding': '2rem 1rem',
        '& > *:not(:last-child)': {
          'marginBottom': '1rem'
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
        <strong>{timeCapsuleId}</strong>
        （<ClickCopyText text={timeCapsuleId}>复制</ClickCopyText>）
      </p>
      <p>开启时间：{openTimeString}</p>
      <p>请妥善保管好您的胶囊ID，并在开启时间之后使用它来开启胶囊。</p>
    </Jumbotron>
  </MainPageLayout>
})

const ClickCopyText = compose(
  withId('id'),
  withState('isOpen', 'setOpen', false),
  withHandlers({
    toggleOpen: ({setOpen, isOpen}) => () => setOpen(!isOpen)
  }),
  withProps({
    styles: {
      text: css({
        'color': '#0275d8',
        'cursor': 'pointer',
      })
    }
  })
)(function ClickCopyText ({id, text, children, styles, isOpen, toggleOpen}) {
  return <span>
    <CopyToClipboard text={text}>
      <span id={id} onClick={toggleOpen} {...styles.text}>{children}</span>
    </CopyToClipboard>
    <Popover placement="top" isOpen={isOpen} target={id} toggle={toggleOpen}>
      <PopoverContent>复制成功</PopoverContent>
    </Popover>
  </span>
})