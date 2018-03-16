'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class GenericButtonComponent {
  constructor(props) {
    this.props = props
    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    const {
      isPrimary,
      isDefault,
      iconClass,
      onclick,
      text
    } = this.props
    const btnClass = `${isPrimary ? 'btn btn-primary' : isDefault ? 'btn btn-default' : 'btn'} ${iconClass || ''}`
    return <button class={btnClass} onclick={onclick}>{text || ''}</button>
  }
  destroy() {
    return etch.destroy(this)
  }
}
