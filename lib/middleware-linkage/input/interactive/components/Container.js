'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Container  as _Container } from '@purduesigbots/pros-cli-middleware'
import { Component } from './Component'

export class Container extends _Container {
  constructor(args) {
    super(args)

    this._component = new Component(args)
  }

  render() {
    const title = this.title || ""
    const description = this.description ? <div>{this.description}</div> : ''
    let style_class = "pros-container"
    if (this.collapsed) {
      style_class += " container-collapsed"
    }
    return this._component.render(
      <section className={style_class}>
        <h4 className="section-heading" onclick={() => this.updateCollapsed(!this.collapsed)}>{title}</h4>
        {description}
        {this.elements.map(e => e.render())}
      </section>
    )
  }
}
