import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { withState, withHandlers } from 'recompose'
import { withMethod, defineMethod } from 'react-method'
import { prop, trim } from 'lodash/fp'
import isEmail from 'validator/lib/isEmail'

import withMeteor from '../../hocs/with_meteor'
import withAlert from '../../hocs/with_alert'
import withMeteorAccounts from '../../hocs/with_meteor_accounts'

export default class AccountModal extends Component {
  render () {
    const {isOpen, toggle} = this.props
    return <Modal isOpen={isOpen} toggle={toggle}>
      <AccountModalView toggle={toggle}/>
    </Modal>
  }
}

@withState('view', 'setView', 'login') // allow: login, signup, forgotPassword
@withHandlers({
  goSignup: ({setView}) => () => setView('signup'),
  goLogin: ({setView}) => () => setView('login'),
  goForgotPassword: ({setView}) => () => setView('forgotPassword'),
})
class AccountModalView extends Component {
  render () {
    const {view, toggle, goSignup, goLogin, goForgotPassword} = this.props
    if (view === 'login') {
      return <LoginModalView toggle={toggle} goSignup={goSignup} goForgotPassword={goForgotPassword}/>
    }
    else if (view === 'signup') {
      return <SignupModalView toggle={toggle} goLogin={goLogin} goForgotPassword={goForgotPassword}/>
    }
    else if (view === 'forgotPassword') {
      return <ForgotPasswordModalView toggle={toggle} goLogin={goLogin} goSignup={goSignup}/>
    }
  }
}

@withMethod('submitForm')
class LoginModalView extends Component {
  render () {
    const {toggle, submitForm, goSignup, goForgotPassword} = this.props
    return <div>
      <ModalHeader toggle={toggle}>登录</ModalHeader>
      <ModalBody>
        <LoginForm submitForm={submitForm.define}/>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-between w-100">
          <div>
            <Button className="mr-2" onClick={goSignup}>去注册</Button>
            <Button onClick={goForgotPassword}>找回密码</Button>
          </div>
          <Button color="primary" onClick={submitForm.invoke}>登录</Button>
        </div>
      </ModalFooter>
    </div>
  }
}

@withState('email', 'setEmail', '')
@withState('password', 'setPassword', '')
@withMeteor('meteor')
@withAlert('alert')
@withHandlers({
  submit: ({meteor, alert, email, password}) => () => {
    email = trim(email)
    password = trim(password)

    if (!isEmail(email)) return alert.error('请输入正确的邮箱')
    if (!password) return alert.error('密码不能为空')

    meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        console.error(err)
        if (err.reason === 'Incorrect password') alert.error('密码错误')
        else if (err.reason === 'User not found') alert.error('该用户尚未注册 ')
        else alert.error('登录失败')
      }
      else {
        alert.success('登录成功')
      }
    })
  }
})
@withHandlers({
  onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
  onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
  onSubmit: ({submit}) => e => {
    e.preventDefault()
    submit()
  }
})
@defineMethod('submitForm', prop('submit'))
class LoginForm extends Component {
  render () {
    const {onSubmit, email, onEmailChange, password, onPasswordChange} = this.props
    return <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>邮箱</Label>
        <Input value={email} onChange={onEmailChange}/>
      </FormGroup>
      <FormGroup>
        <Label>密码</Label>
        <Input type="password" value={password} onChange={onPasswordChange}/>
      </FormGroup>
      <Button className="hidden-xs-up">登录</Button>
    </Form>
  }
}

@withMethod('submitForm')
class SignupModalView extends Component {
  render () {
    const {toggle, submitForm, goLogin, goForgotPassword} = this.props
    return <div>
      <ModalHeader toggle={toggle}>注册</ModalHeader>
      <ModalBody>
        <SignupForm submitForm={submitForm.define}/>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-between w-100">
          <div>
            <Button className="mr-2" onClick={goLogin}>去登录</Button>
            <Button onClick={goForgotPassword}>找回密码</Button>
          </div>
          <Button color="primary" onClick={submitForm.invoke}>注册</Button>
        </div>
      </ModalFooter>
    </div>
  }
}

@withState('email', 'setEmail', '')
@withState('password', 'setPassword', '')
@withMeteorAccounts('accounts')
@withAlert('alert')
@withHandlers({
  submit: ({accounts, alert, email, password}) => () => {
    email = trim(email)
    password = trim(password)

    if (!isEmail(email)) return alert.error('请输入正确的邮箱')
    if (!password) return alert.error('密码不能为空')

    accounts.createUser({email, password}, (err) => {
      if (err) {
        console.error(err)
        if (err.reason === 'Email already exists.') alert.error('该用户已经注册')
        else alert.error('注册失败')
      }
      else {
        alert.success('注册成功')
      }
    })
  }
})
@withHandlers({
  onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
  onPasswordChange: ({setPassword}) => e => setPassword(e.target.value),
  onSubmit: ({submit}) => e => {
    e.preventDefault()
    submit()
  }
})
@defineMethod('submitForm', prop('submit'))
class SignupForm extends Component {
  render () {
    const {onSubmit, email, onEmailChange, password, onPasswordChange} = this.props
    return <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>邮箱</Label>
        <Input value={email} onChange={onEmailChange}/>
      </FormGroup>
      <FormGroup>
        <Label>密码</Label>
        <Input type="password" value={password} onChange={onPasswordChange}/>
      </FormGroup>
      <Button className="hidden-xs-up">注册</Button>
    </Form>
  }
}

@withMethod('submitForm')
class ForgotPasswordModalView extends Component {
  render () {
    const {toggle, submitForm, goLogin, goSignup} = this.props
    return <div>
      <ModalHeader toggle={toggle}>找回密码</ModalHeader>
      <ModalBody>
        <ForgotPasswordForm submitForm={submitForm.define}/>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-between w-100">
          <div>
            <Button className="mr-2" onClick={goLogin}>去登录</Button>
            <Button onClick={goSignup}>去注册</Button>
          </div>
          <Button color="primary" onClick={submitForm.invoke}>找回密码</Button>
        </div>
      </ModalFooter>
    </div>
  }
}

@withState('email', 'setEmail', '')
@withMeteorAccounts('accounts')
@withAlert('alert')
@withHandlers({
  submit: ({accounts, alert, email}) => () => {
    email = trim(email)

    if (!isEmail(email)) return alert.error('请输入正确的邮箱')

    accounts.forgotPassword({email}, (err) => {
      if (err) {
        console.error(err)
        if (err.reason === 'User not found') alert.error('该用户尚未注册')
        else alert.error('操作失败')
      }
      else {
        alert.success('重置密码链接已发送至您的邮箱，请注意查收')
      }
    })
  }
})
@withHandlers({
  onEmailChange: ({setEmail}) => e => setEmail(e.target.value),
  onSubmit: ({submit}) => e => {
    e.preventDefault()
    submit()
  }
})
@defineMethod('submitForm', prop('submit'))
class ForgotPasswordForm extends Component {
  render () {
    const {onSubmit, email, onEmailChange} = this.props
    return <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>邮箱</Label>
        <Input value={email} onChange={onEmailChange}/>
      </FormGroup>
      <Button className="hidden-xs-up">找回密码</Button>
    </Form>
  }
}