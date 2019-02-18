'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { DropDownBox  as _DropDownBox} from '@purduesigbots/pros-cli-middleware'
import { BasicParameterizedComponent } from './BasicParameterizedComponent'


export class ButtonGroup extends _DropDownBox {
  constructor(args) {
    super(args)

    this._basicParameterizedComponent = new BasicParameterizedComponent(args)
  }

  render(children = null) {
    this._basicParameterizedComponent.text = this.text
    if (children === null) {
      items = []
      this.options.forEach((item) => {
        const cls = `btn${item === this.value ? ' selected' : ''}`
        items.push(
          <button className={cls}
                  onClick={() => this.update(item)}>
                  {item}
          </button>
        )
      })
      children = (
        <div className="btn-group">
          {items}
        </div>
      )
    }
    return this._basicParameterizedComponent.render(
      <div className="pros-btn-group">
        {children}
      </div>
    )
  }
}
