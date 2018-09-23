'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Application } from './application'


export class Modal extends Application {
  constructor(arguments) {
    super(arguments)

    this.panel = atom.workspace.addModalPanel({item: this.element})
  }

  show() {
    if (this.panel) {
      this.panel.show()
    } else {
      console.log('Attempting to show a destroyed panel');
    }
  }

  hide() {
    if (this.panel) {
      this.panel.hide()
    }
  }

  render() {
    return (
      <div class='pros pros-application pros-modal'>
        {this.elements.map(e => e.render())}
      </div>
    )
  }
}
