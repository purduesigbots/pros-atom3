'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Label  as _Label} from '@purduesigbots/pros-cli-middleware'
import { Label } from './Label'


export class Spinner extends _Label {
  constructor(args) {
    super(args)

    this._label = new Label(args)
  }
  render(children = null) {
    if (children === null) {
      children = <span className='loading loading-spinner-large inline-block'></span>;
    }
    return this._label.render(
      <div className="pros-spinner">
        {children}
      </div>
    )
  }
}
