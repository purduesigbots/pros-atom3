'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { Modal as _Modal } from '@purduesigbots/pros-cli-middleware'
import { YesNoButtonComponent } from '../../../../components/buttons'


export class Modal extends _Modal {
  constructor(arguments) {
    super(arguments)

    etch.initialize(this)
    etch.setScheduler(atom.views)

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

  refresh(args) {
    super.refresh(args)
    etch.update(this)
  }

  update() {
    return etch.update(this)
  }

  render() {
    console.log('render', this.can_confirm)
    const buttons = [
      <YesNoButtonComponent yes onclick={() => console.log('stub')} disabled={!this.can_confirm} confirmText={this.confirm_button} />,
      <YesNoButtonComponent onclick={() => this.hide()} />
    ]
    // TODO: redo YesNoButtonComponent so that it respects the cancel button info
    // TODO: make cancel actually abort
    return (
      <div class='pros pros-application pros-modal'>
        <div class='message'>
          <h1>{this.title || 'Placeholder'}</h1>
        </div>
        {this.elements.map(e => e.render())}
        <div class='btn-container' style='display: flex; flex-direction: row-reverse'>
          {buttons}
        </div>
      </div>
    )
  }

  destroy() {
    return etch.destroy(this)
  }
}
