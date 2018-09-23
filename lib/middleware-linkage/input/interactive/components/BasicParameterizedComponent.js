'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { BasicParameterizedComponent  as _BasicParameterizedComponent} from '@purduesigbots/pros-cli-middleware'


export class BasicParameterizedComponent extends _BasicParameterizedComponent {
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <div class={`pros basic-parameter${this.valid === false ? ' is-invalid' : ''}`}>
        <h5>{this.text}</h5>
        <TextEditorWrapper value={this.value} update={(value) => this.update(value)} />
      </div>
    )
  }
}
