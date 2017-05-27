import React from 'react'
import moment from 'moment'
import { compose, withProps } from 'recompose'
import PropTypes from 'prop-types'
import { trim } from 'lodash/fp'
import { css }from 'glamor'

import defineComponent from '../../hocs/define_component'
import TimeCapsuleContentView from './TimeCapsuleContentView'

const datePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Date),
  PropTypes.instanceOf(moment)
])

function formatDate (date) {
  if (typeof date === 'string') return date
  else  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export default compose(
  defineComponent('TimeCapsuleView', {
    timeCapsule: PropTypes.shape({
      createdAt: datePropType,
      openTime: datePropType,
      name: PropTypes.string,
      description: PropTypes.string,
      rawContent: PropTypes.object,
    })
  }),
  withProps(({timeCapsule}) => ({
    timeCapsule: {
      ...timeCapsule,
      name: trim(timeCapsule.name),
      description: trim(timeCapsule.description),
      createdAt: formatDate(timeCapsule.createdAt),
      openTime: formatDate(timeCapsule.openTime),
    }
  })),
)(function TimeCapsuleView ({timeCapsule}) {
  return <div>
    <Item>
      <Label inline>胶囊ID</Label>
      {timeCapsule._id}
    </Item>
    <Item>
      <Label inline>创建时间</Label>
      {timeCapsule.createdAt}
    </Item>
    <Item>
      <Label inline>开启时间</Label>
      {timeCapsule.openTime}
    </Item>
    {
      timeCapsule.name && <Item>
        <Label inline>名字</Label>
        {timeCapsule.name}
      </Item>
    }
    {
      timeCapsule.description && <Item>
        <Label>描述</Label>
        <Description>{timeCapsule.description}</Description>
      </Item>
    }
    {
      timeCapsule.rawContent && <Item>
        <Label>内容</Label>
        <TimeCapsuleContentView rawContent={timeCapsule.rawContent}/>
      </Item>
    }
  </div>
})

const Label = compose(
  defineComponent('Label', {
    inline: PropTypes.bool,
    children: PropTypes.node,
  }),
  withProps({
    styles: {
      inlineLabel: css({
        'display': 'inline-block',
      }),
      blockLabel: css({
        'marginBottom': '0.5rem'
      })
    }
  })
)(function Label ({styles, inline, children}) {
  return <div {...(inline ? styles.inlineLabel : styles.blockLabel)}>{children}：</div>
})

const Item = compose(
  withProps({
    styles: {
      item: css({
        '&:not(:last-child)': {
          'marginBottom': '0.5rem'
        }
      })
    }
  })
)(function Item ({styles, children}) {
  return <div {...styles.item}>{children}</div>
})

const Description = compose(
  withProps({
    styles: {
      description: css({
        'whiteSpace': 'pre-wrap',
        'border': '1px solid #F1F1F1',
        'borderRadius': '2px',
        'padding': '5px'
      })
    }
  })
)(function Description ({styles, children}) {
  return <div {...styles.description}>{children}</div>
})

