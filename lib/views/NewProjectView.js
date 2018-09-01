'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import glob from 'glob'

import { createNewProject } from '@purduesigbots/pros-cli-middleware'

import BaseView from './BaseView.js'
import { NewProjectComponent } from '../components/modals'
import { zCLIjs, MiddlewareCallbackHelper } from '../middleware-linkage'

export default class NewProjectView extends BaseView {
  constructor() {
    const onConfirm = cmp => event => {
      let loc = ''
      zCLIjs(createNewProject, {
        finalize: d => {
          if(d.method != 'project-report') {
            return
          }
          proj = d.data.project
          lines = d.human.split('\n')
          atom.notifications.addSuccess(lines[0], {
            detail: lines.slice(1).join('\n')
          })
          loc = proj.location
        } // TODO: properly handle target param
      }, cmp.path, cmp.kernel, 'v5', {cache: true}).then(code => {
        // NOTE: createNewProject will definitely return -1 on error
        //       (we want to open the project even if it didn't compile)
        if (code !== -1) {
          atom.project.addPath(loc)
          glob(`${loc}/src/opcontrol.*`, (err, files) => {
            if(files.length > 0) {
              atom.workspace.open(files[0], {pending: true})
            }
          })
        } else {
          console.error(`failed to create and compile project (code ${code})`)
        }
      })
      this.cancel()
    }
    const onCancel = cmp => event => {
      this.cancel()
    }

    super(new NewProjectComponent({confirm: onConfirm, cancel: onCancel}))
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
