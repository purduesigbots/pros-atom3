'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { Label  as _Label} from '@purduesigbots/pros-cli-middleware'
import { Component } from './component'


export class Label extends _Label {
  constructor(args) {
    super(args)

    this._component = new Component(args);
  }
  render(children = null) {
    if (children === null) {
      children = this.text;
    }
    return this._component.render(
      <div class="pros-label">
        {children}
      </div>
    )
  }
}
