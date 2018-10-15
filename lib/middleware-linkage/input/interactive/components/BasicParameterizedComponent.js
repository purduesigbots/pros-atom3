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
    return this._parameterizedComponent.render(
      <div>
        <h5>{this.text}</h5>
        {children}
      </div>
    )
  }
}
