'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { BasicParameterizedComponent  as _BasicParameterizedComponent} from '@purduesigbots/pros-cli-middleware'
import { ParameterizedComponent } from './ParameterizedComponent'


export class Checkbox extends _BasicParameterizedComponent {
  constructor(args) {
    super(args)

    this._parameterizedComponent = new ParameterizedComponent(args)
  }

  render(children = null) {
    if (children === null) {
      children = (
        <div class="pros-checkbox">
          <h5 style="display: inline; margin-right: 1em;">{this.text}</h5>
          <input class='input-toggle' type='checkbox' checked={this.value} onchange={(event) => this.update(event.target.checked)} />
        </div>
      )
    } else {
      children = (
        <div class="pros-checkbox">
          {children}
        </div>
      )
    }
    return this._parameterizedComponent.render(children)
  }
}
