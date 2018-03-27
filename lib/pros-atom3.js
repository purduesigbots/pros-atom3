'use babel'

import etch from 'etch'
import { CompositeDisposable } from 'atom'

import { NewProjectView, UpgradeProjectView } from './views'

import { testUi } from '@purduesigbots/pros-cli-middleware'
import { MiddlewareCallbackHelper } from './middleware-linkage'

import { consumeConsole } from './util'

export default {
  subscriptions: null,

  consumeConsole: consumeConsole,

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
      'pros:test-ui': () => testUi(new MiddlewareCallbackHelper())
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
