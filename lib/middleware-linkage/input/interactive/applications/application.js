'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Application  as _Application} from '@purduesigbots/pros-cli-middleware'


export class Application extends _Application {
  constructor(arguments) {
    super(arguments)

    etch.initialize(this)
    etch.setScheduler(atom.views)
  }

  render() {
    return (
      <div class='pros pros-application'>
        {this.elements.map(e => e.render())}
      </div>
    )
  }

  refresh(args) {
    super.refresh(args)
    etch.update(this)
  }

  update() {
    return etch.update(this)
  }

  destroy() {
    return etch.destroy(this)
  }
}
