'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class GenericButtonComponent {
  constructor(props) {
    this.props = props
    etch.initialize(this)
  }
  update(props) {
    this.props = props
    return etch.update(this)
  }
  render() {
    const {
      isPrimary,
      isDefault,
      iconClass,
      onclick,
      text,
      disabled
    } = this.props
    const btnClass = `${isPrimary ? 'btn btn-primary' : isDefault ? 'btn btn-default' : 'btn'} ${iconClass || ''}`
    return <button class={btnClass} onclick={onclick} disabled={disabled}>{text || ''}</button>
  }
  destroy() {
    return etch.destroy(this)
  }
}
