'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import { createNewProject } from '@purduesigbots/pros-cli-middleware'

import BaseView from './BaseView.js'
import { NewProjectComponent } from '../components/modals'

export default class NewProjectView extends BaseView {
  constructor(serializedState) {
    const onConfirm = cmp => event => {
      console.log(cmp.path)
      console.log(cmp.kernel)
      // TODO: handle these callbacks more generically
      createNewProject(
        d => console.log(d),
        d => console.log(d),
        d => atom.notifications.addSuccess(
          `Created PROS project for ${d.data.project.target} at ${d.data.project.location}`
        ), cmp.path, cmp.kernel
      )
      this.cancel()
    }
    const onCancel = cmp => event => {
      console.log('cancelled!')
      this.cancel()
    }

    super(serializedState, new NewProjectComponent({confirm: onConfirm, cancel: onCancel}))
    atom.keymaps.add('new-project-keymap', {
      '.pros-modal.new-project-modal': {
        'escape': 'core:cancel'
      }
    })
    console.log(this.getElement())
    atom.commands.add(this.getElement(), 'core:cancel', () => this.cancel())
    this.panel = this.panel || atom.workspace.addModalPanel({item: this, visible: false})
  }

  cancel() {
    if (this.panel) {
      this.panel.hide()
      this.panel.destroy()
      this.panel = null
    }
    atom.workspace.getActivePane().activate()
  }
}
