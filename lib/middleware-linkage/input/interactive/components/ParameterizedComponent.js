'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { ParameterizedComponent  as _ParameterizedComponent} from '@purduesigbots/pros-cli-middleware'
import { Component } from './Component'

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
      const cls = this.valid === false ? 'text-error' : 'text-warning'
      valid_reason = <div className={cls}>{this.valid_reason}</div>
    } else {
      valid_reason = null
    }
    return this._component.render(
      <div className={`pros-parameter ${this.valid === false ?  'is-invalid' : ''}`}>
        {children}
        {valid_reason}
      </div>
    )
  }
}
