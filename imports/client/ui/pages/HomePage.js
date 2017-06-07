import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

import withStyles from '../../hocs/with_styles'
import MainPageLayout from '../layouts/MainPageLayout'

@withStyles('styles', {
  centeredBox: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  title: {
    marginBottom: '1rem'
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '10rem'
  }
})
export default class HomePage extends Component {
  render () {
    const {styles} = this.props
    return <MainPageLayout>
      <div {...styles.centeredBox}>
        <h1 {...styles.title}>时光胶囊</h1>
        <div {...styles.buttonsBox}>
          <Button tag={Link} to="/time-capsule/create" color="primary">创建</Button>
          <Button tag={Link} to="/time-capsule/open" color="primary">打开</Button>
        </div>
      </div>
    </MainPageLayout>
  }
}