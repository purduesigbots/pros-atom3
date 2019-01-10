'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Button  as _Button } from '@purduesigbots/pros-cli-middleware'
import { Component } from './Component'

export class Button extends _Button {
  constructor(args) {
    super(args)

    this._component = new Component(args)
  }

  render() {
    return this._component.render(
      <button class={"btn"}
              onClick={() => this.onClick()}>
              {this.text}
      </button>
    )
  }
}
