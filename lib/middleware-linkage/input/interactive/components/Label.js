'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Label  as _Label} from '@purduesigbots/pros-cli-middleware'
import { Component } from './component'


export class Label extends _Label {
  constructor(args) {
    super(args)

    this._component = new Component(args)
  }
  render(children = null) {
    if (children === null) {
      children = []
      for(line of this.text.split('\n')) {
        children.push(<div>{line}</div>)
      }
    }
    return this._component.render(
      <div className="pros-label">
        {children}
      </div>
    )
  }
}

export class VerbatimLabel extends Label {
  render(children = null) {
    if (children === null) {
      children = <pre>{this.text}</pre>
    }
    return this._component.render(
      <div className="pros-label pros-verbatim-label">
        {children}
      </div>
    )
  }
}
