'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Container } from './Container'
import { BasicParameterizedComponent } from '@purduesigbots/pros-cli-middleware'

export class TemplateListingComponent extends Container {
  constructor(args) {
    super(args)
  }

  render() {
    if (this.elements[0] instanceof BasicParameterizedComponent) {
      this.elements[0].text = ''
    }
    if (this.elements[1] instanceof BasicParameterizedComponent) {
      this.elements[1].text = ''
    }
    return this._component.render(
      <section className="pros-template-parameter">
        {this.elements[0].render()}
        <span>@</span>
        {this.elements.slice(1).map(e => e.render())}
      </section>
    )
  }
}
