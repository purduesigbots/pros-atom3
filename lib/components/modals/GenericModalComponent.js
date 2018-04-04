'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import { YesNoButtonComponent } from '../buttons'

export default class GenericModalComponent {
  constructor(props) {
    this.props = props

    this.btnContainerStyle = `display: flex; flex-direction: row-reverse`

    etch.initialize(this)
  }
  update(props) {
    if (props.message && this.props.message !== props.message) {
      this.props.message = props.message
    }
    if (props.dropdownElem) {
      this.props.dropdownElem = props.dropdownElem
    }
    return etch.update(this)
  }
  render() {
    const {
      modalClass,
      message,
      inputElem,
      dropdownElem,
      buttons
    } = this.props
    return (
      <div class={`pros pros-modal ${modalClass || ''}`}>
        <div class='message'>
          <h1>{message}</h1>
        </div>
        <div class='inp'>{inputElem || ''}</div>
        <div class='drop'>{dropdownElem || ''}</div>
        <div class='btn-container' style={this.btnContainerStyle}>{buttons}</div>
      </div>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
