'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import glob from 'glob'

import { createNewProject } from '@purduesigbots/pros-cli-middleware'

import BaseView from './BaseView.js'
import { NewProjectComponent } from '../components/modals'
import { MiddlewareCallbackHelper } from '../middleware-linkage'

export default class NewProjectView extends BaseView {
  constructor() {
    const onConfirm = cmp => event => {
      createNewProject(new MiddlewareCallbackHelper({
        finalize: d => {
          if(d.method != 'project-report') {
            return
          }
          proj = d.data.project
          lines = d.human.split('\n')
          atom.notifications.addSuccess(lines[0], {detail: lines.slice(1).join('\n')})
          atom.project.addPath(proj.location)
          glob(`${proj.location}/src/opcontrol.*`, function (err, files) {
            if(files.length > 0) {
              atom.workspace.open(files[0], {pending: true})
            }
          })
        }}), // end of MiddlewareCallbackHelper
        // TODO: properly handle target parameter
        cmp.path, cmp.kernel, 'v5', {cache: true}
      )
      this.cancel()
    }
    const onCancel = cmp => event => {
      this.cancel()
    }

    super(new NewProjectComponent({confirm: onConfirm, cancel: onCancel}))
    atom.keymaps.add('new-project-keymap', {
      '.pros-modal.new-project-modal': {
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
