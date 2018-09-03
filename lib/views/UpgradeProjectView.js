'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import { upgradeProject } from '@purduesigbots/pros-cli-middleware'

import BaseView from './BaseView.js'
import { UpgradeProjectComponent } from '../components/modals'
import { zCLIjs } from '../middleware-linkage'

export default class UpgradeProjectView extends BaseView {
  constructor(serializedState) {
    const onConfirm = cmp => event => {
      console.log('confirm', this.candidates)
      if (this.candidates.length > 0) {
        this.candidates.forEach(t => {
          if (t !== 'keep') {
            zCLIjs(upgradeProject, {}, `"${cmp.path}"`, t)
          }
        })
        this.cancel()
      } else {
        console.error('no candidates selected for upgrade')
      }
    }
    const onCancel = cmp => event => this.cancel()
    const onCandidatesChanged = data => {
      console.log('change', data)
      this.candidates = data
    }
    super(new UpgradeProjectComponent({
      confirm: onConfirm,
      cancel: onCancel,
      onChanged: onCandidatesChanged
    }))
    this.candidates = []
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
