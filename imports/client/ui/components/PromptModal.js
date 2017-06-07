import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { withState, withHandlers, defaultProps } from 'recompose'
import PropTypes from 'prop-types'

import defineComponent from '../../hocs/define_component'

@defineComponent('PromptModal', {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  header: PropTypes.string,
  label: PropTypes.string,
  cancelButton: PropTypes.string,
  confirmButton: PropTypes.string,
  defaultValue: PropTypes.string,
  validate: PropTypes.func, // func(value): result
  callback: PropTypes.func, // func(value), null for cancel, string for confirmed
})
@defaultProps({
  cancelButton: '取消',
  confirmButton: '确定',
  validate: () => true,
  defaultValue: '',
})
@withState('value', 'setValue', ({defaultValue}) => defaultValue)
@withHandlers({
  toggle: ({toggle, value, setValue, callback, defaultValue}) => (confirmed) => {
    toggle()
    callback(confirmed === true ? value : null)
  }
})
@withHandlers({
  confirm: ({toggle, value, validate}) => () => {
    if (validate(value)) {
      toggle(true)
    }
  }
})
@withHandlers({
  onChange: ({setValue}) => e => setValue(e.target.value),
  onSubmit: ({confirm}) => e => {
    e.preventDefault()
    confirm()
  }
})
export default class PromptModal extends Component {
  render () {
    const {isOpen, toggle, header, label, cancelButton, confirmButton, onSubmit, value, onChange, confirm} = this.props
    return <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label>{label}</Label>
            <Input value={value} onChange={onChange} autoFocus/>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>{cancelButton}</Button>
        <Button color="primary" onClick={confirm}>{confirmButton}</Button>
      </ModalFooter>
    </Modal>
  }
}