import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { withProps, compose } from 'recompose'
import { css } from 'glamor'
import { Link, withRouter } from 'react-router-dom'

import Container from './Container'

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
      container: css({
        'display': 'flex',
        'justifyContent': 'space-between',
      }),
      navs: css({
        'flexDirection': 'row',
        '& > .nav-item > .nav-link': {
          'padding': '0.5rem'
        }
      })
    }
  })
)(function MainNavbar ({styles, navs}) {
  return <Navbar color="faded" light>
    <Container {...styles.container}>
      <NavbarBrand tag={Link} to="/">时光胶囊</NavbarBrand>
      <Nav navbar {...styles.navs}>
        {
          navs.map(nav => (
            <NavItem key={nav.name}>
              <NavLink tag={Link} to={nav.path} active={nav.active}>{nav.name}</NavLink>
            </NavItem>
          ))
        }
      </Nav>
    </Container>
  </Navbar>
})