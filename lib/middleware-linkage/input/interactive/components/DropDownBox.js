'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { DropDownBox  as _DropDownBox} from '@purduesigbots/pros-cli-middleware'
import { BasicParameterizedComponent } from './BasicParameterizedComponent'


export class DropDownBox extends _DropDownBox {
  constructor(args) {
    super(args);

    this._basicParameterizedComponent = new BasicParameterizedComponent(args)
  }

  render() {
    options = this.options.map(e => {
      return <option>{e}</option>
    })
    return this._basicParameterizedComponent.render(
      <div class="pros-dropdown">
        <select class='form-control' onChange={(event) => this.update(event.target.value)}>
          {options}
        </select>
      </div>
    )
  }
}
