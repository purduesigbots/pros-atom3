'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { ParameterizedComponent  as _ParameterizedComponent} from '@purduesigbots/pros-cli-middleware'
import { Component } from './component'

export class ParameterizedComponent extends _ParameterizedComponent {
  constructor(args) {
    super(args)

    this._component = new Component(args)
  }

  render(children = null) {
    if (children === null) {
      children = <TextEditorWrapper value={this.value.toString()} update={(value) => this.update(value)} />
    }
    if (this.valid_reason)  {
      valid_reason = <div class={this.valid === false ? 'text-error' : 'text-warning'}>{this.valid_reason}</div>
    } else {
      valid_reason = null;
    }
    return this._component.render(
      <div class={this.valid === false ?  'is-invalid' : ''}>
        {children}
        {valid_reason}
      </div>
    )
  }
}
