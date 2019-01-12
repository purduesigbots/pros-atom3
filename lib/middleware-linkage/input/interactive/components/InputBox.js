'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { InputBox  as _InputBox} from '@purduesigbots/pros-cli-middleware'
import { BasicParameterizedComponent } from './BasicParameterizedComponent'


export class InputBox extends _InputBox {
  constructor(args) {
    super(args)

    this._basicParameterizedComponent = new BasicParameterizedComponent(args)
  }

  render(children = null) {
    this._basicParameterizedComponent.text = this.text
    if (children === null) {
      children = <TextEditorWrapper value={this.value} update={(value) => this.update(value)}
                         placeholder={this.placeholder}/>
    }
    return this._basicParameterizedComponent.render(
      <div className="pros-inputbox">
        {children}
      </div>
    )
  }
}
