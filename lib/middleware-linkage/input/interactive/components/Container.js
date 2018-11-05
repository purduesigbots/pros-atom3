'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Container  as _Container } from '@purduesigbots/pros-cli-middleware'

export class Container extends _Container {
  constructor(args) {
    super(args)
  }

  render() {
    const title = this.title || "";
    const description = this.description ? <div>{this.description}</div> : ''
    let style_class = "pros-container"
    if (this.collapsed) {
      style_class += " container-collapsed"
    }
    return (
      <section class={style_class}>
        <h4 class="section-heading" onclick={() => this.updateCollapsed(!this.collapsed)}>{title}</h4>
        {description}
        {this.elements.map(e => e.render())}
      </section>
    )
  }
}
