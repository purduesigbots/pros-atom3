'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { BasicParameterizedComponent  as _BasicParameterizedComponent} from '@purduesigbots/pros-cli-middleware'
import { ParameterizedComponent } from './ParameterizedComponent'

export class BasicParameterizedComponent extends _BasicParameterizedComponent {
  constructor(args) {
    super(args)

    this._parameterizedComponent = new ParameterizedComponent(args)
  }

  render(children = null) {
    if (children === null) {
      children = <TextEditorWrapper value={this.value.toString()} update={(value) => this.update(value)} />
    }
    if (!!this.text) {
      text = <h5>{this.text}</h5>
    } else {
      text = ''
    }
    return this._parameterizedComponent.render(
      <div class="pros-basic-parameter">
        {text}
        {children}
      </div>
    )
  }
}
