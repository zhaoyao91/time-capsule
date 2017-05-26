import React from 'react'
import moment from 'moment'

import TimeCapsuleContentView from './TimeCapsuleContentView'

export default function TimeCapsuleView ({timeCapsule}) {
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
}