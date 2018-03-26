'use babel'

import etch from 'etch'
import { CompositeDisposable } from 'atom'

import { NewProjectView, UpgradeProjectView } from './views'

import { testUi } from '@purduesigbots/pros-cli-middleware'
import { MiddlewareCallbackHelper } from './middleware-linkage'

import { consumeConsole } from './util'

export default {

  prosAtom3View: null,
  modalPanel: null,
  subscriptions: null,

  consumeConsole: consumeConsole,

  activate(state) {
    etch.setScheduler(atom.views)
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()


    const newProjectViewProvider = NewProjectView.register()
    this.newProjectPanel = new NewProjectView(state.newProjectViewState)
    const upgradeProjectViewProvider = UpgradeProjectView.register()
    this.upgradeProjectPanel = new UpgradeProjectView(state.upgradeProjectViewState)

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pros:upgrade-project': () => this.upgradeProjectPanel.toggle(),
      'pros:new-project': () => this.newProjectPanel.toggle(),
      'pros:test-ui': () => testUi(new MiddlewareCallbackHelper())
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
    this.newProjectPanel.destroy()
    this.upgradeProjectPanel.destroy()
  },

  serialize() {
    // TODO: maybe we should actually implement these
    return {
      newProjectViewState: this.newProjectPanel.serialize(),
      upgradeProjectViewState: this.upgradeProjectPanel.serialize()
    }
  }
}
