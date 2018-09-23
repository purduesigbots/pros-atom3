'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Container  as _Container } from '@purduesigbots/pros-cli-middleware'

export class Container extends _Container {
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <div class={`pros ${this.valid === false ? 'is-invalid' : ''}`}>
        <h4>{this.title}</h4>
        <div>{this.description}</div>
        {this.elements.map(e => e.render())}
      </div>
    )
  }
}
