import React from 'react'
import moment from 'moment'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

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
      rawContent: PropTypes.object,
    })
  }),
)(function TimeCapsuleView ({timeCapsule}) {
  return <div>
    <p className="mb-2">胶囊ID：{timeCapsule._id}</p>
    <p className="mb-2">创建时间：{formatDate(timeCapsule.createdAt)}</p>
    <p className="mb-2">开启时间：{formatDate(timeCapsule.openTime)}</p>
    {
      timeCapsule.rawContent && <div>
        <p className="mb-2">内容：</p>
        <TimeCapsuleContentView rawContent={timeCapsule.rawContent}/>
      </div>
    }
  </div>
})