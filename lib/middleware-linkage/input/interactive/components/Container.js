'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Container  as _Container } from '@purduesigbots/pros-cli-middleware'

export class Container extends _Container {
  constructor(args) {
    super(args);
  }

  render() {
    const title = this.title ? <h4>{this.title}</h4> : '';
    const description = this.description ? <div>{this.description}</div> : '';
    return (
      <div class='pros'>
        {title}
        {description}
        {this.elements.map(e => e.render())}
      </div>
    )
  }
}
