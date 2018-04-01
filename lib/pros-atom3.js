'use babel'

import etch from 'etch'
import { CompositeDisposable } from 'atom'

import config from './config'
import { NewProjectView, UpgradeProjectView } from './views'

import { testUi, uploadProject } from '@purduesigbots/pros-cli-middleware'
import { zCLIjs } from './middleware-linkage'

import { consumeConsole, consumeBusySignal } from './util'

export default {
  subscriptions: null,
  config,

  consumeConsole: consumeConsole,
  consumeBusySignal: consumeBusySignal,

  newView(view) {
    v = new view()
    v.show()
    // TODO: maybe do disposable stuff?
  },

  activate(state) {
    etch.setScheduler(atom.views)
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    const newProjectViewProvider = NewProjectView.register()
    const upgradeProjectViewProvider = UpgradeProjectView.register()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pros:upgrade-project': () => this.newView(UpgradeProjectView),
      'pros:new-project': () => this.newView(NewProjectView),
      'pros:test-ui': () => zCLIjs(testUi, {label: 'PROS UI Test'}),
      'pros:upload': () => zCLIjs(uploadProject, {label: 'PROS Basic Upload'}, atom.project.relativizePath(atom.workspace.getActiveTextEditor().getPath())[0])
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  serialize() {
    // TODO: maybe we should actually implement these
    return {}
  }
}
