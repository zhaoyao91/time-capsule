import React, { Component } from 'react'
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { withHandlers, defaultProps } from 'recompose'
import PropTypes from 'prop-types'

import defineComponent from '../../hocs/define_component'

@defineComponent('ConfirmModal', {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  header: PropTypes.string,
  content: PropTypes.string,
  cancelButton: PropTypes.string,
  confirmButton: PropTypes.string,
  callback: PropTypes.func, // func(result)
})
@defaultProps({
  cancelButton: '取消',
  confirmButton: '确定',
})
@withHandlers({
  toggle: ({toggle, callback}) => (confirmed) => {
    toggle()
    callback(confirmed === true)
  }
})
export default class ConfirmModal extends Component {
  render () {
    const {isOpen, toggle, header, content, cancelButton, confirmButton} = this.props
    return <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>
        <div>{content}</div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>{cancelButton}</Button>
        <Button color="primary" onClick={() => toggle(true)}>{confirmButton}</Button>
      </ModalFooter>
    </Modal>
  }
}