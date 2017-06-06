import React, { Component } from 'react'
import { withProps, withHandlers, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { Accounts } from 'meteor/accounts-base'

import MainPageLayout from '../layouts/MainPageLayout'
import withRouteParams from '../../hocs/with_route_params'
import withAlert from '../../hocs/with_alert'

@withRouter
@withRouteParams('params')
@withProps(({params}) => ({token: params.token}))
export default class ResetPasswordPage extends Component {
  render () {
    const {token} = this.props
    return <MainPageLayout>
      <ResetPasswordForm token={token}/>
    </MainPageLayout>
  }
}

@withRouter
@withState('password', 'setPassword', '')
@withAlert('alert')
@withHandlers({
  onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
  onSubmit: ({alert, token, password, history}) => e => {
    e.preventDefault()

    if (!password) return alert.error('密码不能为空')

    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        console.error(err)
        if (err.reason === 'Token expired') alert.error('链接已失效')
        else alert.error('重置密码失败')
      }
      else {
        alert.success('重置密码成功')
        history.push('/')
      }
    })
  }
})
class ResetPasswordForm extends Component {
  render () {
    const {password, onPasswordChange, onSubmit} = this.props
    return <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>新密码</Label>
        <Input type="password" value={password} onChange={onPasswordChange}/>
      </FormGroup>
      <Button color="primary">重置密码</Button>
    </Form>
  }
}