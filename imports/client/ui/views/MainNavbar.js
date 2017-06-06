import React, { Component } from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { withProps, compose, withState, withHandlers } from 'recompose'
import { css } from 'glamor'
import { Link, withRouter } from 'react-router-dom'
import Avatar from 'react-avatar'
import { Meteor } from 'meteor/meteor'
import { prop } from 'lodash/fp'

import { pointerCursor, noMinWidth } from '../../styles/styles'
import Container from '../components/Container'
import withCurrentUser from '../../hocs/with_current_user'
import AccountModal from './AccountModal'

export default compose(
  withRouter,
  withProps(({match}) => ({
    navs: [
      {name: '创建', path: '/time-capsule/create'},
      {name: '打开', path: '/time-capsule/open'},
    ].map(nav => ({
      ...nav,
      active: match.path === nav.path
    }))
  })),
  withProps({
    styles: {
      navs: css({
        'flexDirection': 'row',
        '& > .nav-item > .nav-link': {
          'padding': '0.5rem'
        }
      })
    }
  })
)(function MainNavbar ({styles, navs}) {
  return <Navbar color="faded" light className="pl-0 pr-0">
    <Container className="d-flex justify-content-between align-items-center">
      <NavbarBrand tag={Link} to="/">时光胶囊</NavbarBrand>
      <Nav navbar {...styles.navs}>
        {
          navs.map(nav => (
            <NavItem key={nav.name}>
              <NavLink tag={Link} to={nav.path} active={nav.active}>{nav.name}</NavLink>
            </NavItem>
          ))
        }
        <NavItem>
          <UserItem/>
        </NavItem>
      </Nav>
    </Container>
  </Navbar>
})

@withCurrentUser('currentUser')
@withProps(({currentUser}) => ({
  user: currentUser.user
}))
class UserItem extends Component {
  render () {
    const {user} = this.props
    if (user) return <LoggedInUserItem user={user}/>
    else return <LoginItem/>
  }
}

@withRouter
@withHandlers({
  logout: () => () => Meteor.logout(),
  goMyTimeCapsules: ({history}) => () => history.push('/my/time-capsules')
})
@withProps(({user}) => ({
  avatarValue: getEmailName(prop('emails.0.address', user) || '').slice(0, 2)
}))
class LoggedInUserItem extends Component {
  render () {
    const {logout, goMyTimeCapsules, avatarValue} = this.props
    return <NavLink className="p-0 ml-2">
      <UncontrolledDropdown>
        <DropdownToggle tag="div" {...pointerCursor}>
          <Avatar name={name} round size={40} value={avatarValue} textSizeRatio={2.5}/>
        </DropdownToggle>
        <DropdownMenu right {...noMinWidth}>
          <DropdownItem {...pointerCursor} onClick={goMyTimeCapsules}>我的胶囊</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem {...pointerCursor} onClick={logout} className="text-danger">退出登录</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </NavLink>
  }
}

@withState('isModalOpen', 'setModalOpen', false)
@withHandlers({
  toggleModal: ({setModalOpen}) => () => setModalOpen(x => !x)
})
class LoginItem extends Component {
  render () {
    const {isModalOpen, toggleModal} = this.props
    return <NavLink {...pointerCursor} onClick={toggleModal}>
      登录
      <AccountModal isOpen={isModalOpen} toggle={toggleModal}/>
    </NavLink>
  }
}

function getEmailName (email) {
  return email.substr(0, email.indexOf('@'))
}