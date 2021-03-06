'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Component  as _Component} from '@purduesigbots/pros-cli-middleware'

export class Component extends _Component {
  constructor(arguments) {
    super(arguments)
    this.params = arguments
  }

  render(children = null) {
    if (children === null) {
      children = JSON.stringify(this.params.etype)
    }
    return (
      <section className='pros-component'>
        {children}
      </section>
    )
  }
}
