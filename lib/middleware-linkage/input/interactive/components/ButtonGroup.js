'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { DropDownBox  as _DropDownBox} from '@purduesigbots/pros-cli-middleware'
import { BasicParameterizedComponent } from './BasicParameterizedComponent'


export class ButtonGroup extends _DropDownBox {
  constructor(args) {
    super(args)

    this._basicParameterizedComponent = new BasicParameterizedComponent(args)
  }

  render(children = null) {
    if (children === null) {
      items = []
      this.options.forEach((item) => {
        items.push(
          <button class={"btn" + (item === this.value ? " selected" : "")}
                  onClick={() => this.update(item)}>
                  {item}
          </button>
        )
      })
      children = (
        <div class="btn-group">
          {items}
        </div>
      )
    }
    return this._basicParameterizedComponent.render(
      <div class="pros-btn-group">
        {children}
      </div>
    )
  }
}
