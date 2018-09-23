'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { InputBox  as _InputBox} from '@purduesigbots/pros-cli-middleware'


export class InputBox extends _InputBox {
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <div class={`pros basic-parameter${this.valid === false ? ' is-invalid' : ''}`}>
        <h5>{this.text}</h5>
        <TextEditorWrapper value={this.value} update={(value) => this.update(value)}
                           placeholder={this.placeholder}/>
      </div>
    )
  }
}
