'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { ParameterizedComponent  as _ParameterizedComponent} from '@purduesigbots/pros-cli-middleware'

export class ParameterizedComponent extends _ParameterizedComponent {
  constructor(args) {
    super(args);
  }

  render() {
    return (
      <div class={`pros ${this.valid === false ? 'is-invalid' : ''}`}>
        <TextEditorWrapper value={this.value} update={(value) => this.update(value)} />
      </div>
    )
  }
}
