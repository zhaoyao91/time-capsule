import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import arrayUtils from '../../utils/array'
import defineComponent from '../../hocs/define_component'

export default compose(
  defineComponent('Tabs', {
    activeTab: PropTypes.string,
    switchTab: PropTypes.func, // func(tabId)
    
    // child must have props: tabId, tabName
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ])
  }),
)(function Tabs ({activeTab, switchTab, children}) {
  children = arrayUtils.ensureArray(children)
  return <div>
    <Nav tabs>
      {
        children.map(child => (
          <NavItem key={child.props.tabId}>
            <NavLink className={classnames({active: activeTab === child.props.tabId})}
                     onClick={() => switchTab(child.props.tabId)}>
              {child.props.tabName}
            </NavLink>
          </NavItem>
        ))
      }
    </Nav>
    <TabContent activeTab={activeTab}>
      {
        children.map(child => (
          <TabPane key={child.props.tabId} tabId={child.props.tabId}>{child}</TabPane>
        ))
      }
    </TabContent>
  </div>
})