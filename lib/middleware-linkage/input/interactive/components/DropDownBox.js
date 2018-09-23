'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { DropDownBox  as _DropDownBox} from '@purduesigbots/pros-cli-middleware'


export class DropDownBox extends _DropDownBox {
  constructor(args) {
    super(args);
  }

  render() {
    options = this.options.map(e => {
      return <option>{e}</option>
    })
    return (
      <div class={`pros basic-parameter${this.valid === false ? ' is-invalid' : ''}`}>
        <h5>{this.text}</h5>
          <select class='form-control' onChange={(event) => this.update(event.target.value)}>
            {options}
          </select>
      </div>
    )
  }
}
