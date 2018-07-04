'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import GenericButtonComponent from './GenericButtonComponent.js'

export default class YesNoButtonComponent {
  constructor(props) {
    this.props = props
    this.props.yes = !!this.props.yes || false

    etch.initialize(this)
  }
  update(props) {
    this.props = props
    return etch.update(this)
  }
  render() {
    const {
      yes,
      onclick,
      confirmText,
      disabled
    } = this.props
    return (
      <GenericButtonComponent
        isPrimary={yes}
        iconClass={yes ? 'icon icon-rocket' : ''}
        onclick={onclick}
        text={yes ? (confirmText || 'OK') : 'Cancel'}
        disabled={disabled} />
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
