import React from 'react'
import { Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap'
import { compose, withProps, withHandlers, withState } from 'recompose'
import { css }from 'glamor'
import { withRouter } from 'react-router-dom'

import MainPageLayout from '../layouts/MainPageLayout'
import DatetimeInput from '../views/DatetimeInput'
import withAlert from '../../hocs/with_alert'
import withMeteor from '../../hocs/with_meteor'

export default compose(
  withRouter,
  withProps(({match}) => ({
    timeCapsuleId: match.params.timeCapsuleId
  })),
  withProps({
    styles: {
      jumbotronContainer: css({
        'paddingTop': '1rem',
        '& > .jumbotron > *:not(:last-child)': {
          'marginBottom': '1rem'
        },
        '& > .jumbotron > *:last-child': {
          'marginBottom': 0
        }
      })
    }
  })
)(function TimeCapsuleCreatedPage ({styles, timeCapsuleId}) {
  return <MainPageLayout>
    <div {...styles.jumbotronContainer}>
      <Jumbotron>
        <h1>创建成功！</h1>
        <p>胶囊ID：{timeCapsuleId}</p>
        <p>请妥善保管好您的胶囊ID，并在xx时间之后使用它来开启胶囊。</p>
      </Jumbotron>
    </div>
  </MainPageLayout>
})