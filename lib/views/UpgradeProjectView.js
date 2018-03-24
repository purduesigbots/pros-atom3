'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import { upgradeProject } from '@purduesigbots/pros-cli-middleware'

import BaseView from './BaseView.js'
import { UpgradeProjectComponent } from '../components/modals'

export default class UpgradeProjectView extends BaseView {
  constructor(serializedState) {
    const onConfirm = cmp => event => {
      for (let t of this.candidates) {
        upgradeProject({
          notify: d => console.log(d),
          log: d => console.log(d),
          finalize: d => atom.notifications.addSuccess(
            `Upgraded ${t.split('@')[0]} in ${cmp.path} to ${t.split('@')[1]}`
          )}, cmp.path, t
        )
      }
      this.cancel()
    }
    const onCancel = cmp => event => this.cancel()
    const onCandidatesChanged = data => this.candidates = data
    super(serializedState, new UpgradeProjectComponent({
      confirm: onConfirm,
      cancel: onCancel,
      onChanged: onCandidatesChanged
    }))
    this.candidates = []
    atom.keymaps.add('upgrade-project-keymap', {
      '.pros-modal.upgrade-project-modal': {
        'escape': 'core:cancel'
      }
    })
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
